import Movie from '../models/Movie.js';
import axios from 'axios';
import stringSimilarity from 'string-similarity';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

export const addMovies = async (req, res) => {
    try {
        const {
            title,
            genre,
            releasedYear,
            Director,
            Cast,
            rating,
            description
        } = req.body;

        if (!title || !genre || !releasedYear || !description) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }
      
        // Get embedding from OpenAI
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: description,
        });
      
        const embedding = embeddingResponse.data[0].embedding;

        const newMovie = new Movie({
            title,
            genre,
            releasedYear,
            Director,
            Cast,
            rating,
            description,
            embedding
        });

        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const searchMovies = async (req, res) => {
    const { query } = req.body;

    try {
        const embedResponse = await axios.post(
            'https://api.openai.com/v1/embeddings', {
                input: query,
                model: 'text-embedding-ada-002'
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        )

        const queryEmbedding = embedResponse.data.data[0].embedding;

        const movies = await Movie.find({}, {
            title: 1,
            genre: 1,
            releasedYear: 1,
            Director: 1,
            Cast: 1,
            rating: 1,
            description: 1,
            embedding: 1
          });

        const cosineSimilarity = (vecA, vecB) => {
            const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
            const normA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
            const normB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
            return dotProduct / (normA * normB);
        }

        const matchProperty = {
            'exact match': 3,
            'partial match': 2,
            'no match': 1
        }

        const results = movies.map(movie => {
            const similarity = cosineSimilarity(queryEmbedding, movie.embedding);

            const title = movie.title || '';
            const description = movie.description || '';

            const titleSimilarity = stringSimilarity.compareTwoStrings(query, title);
            const descriptionSimilarity = stringSimilarity.compareTwoStrings(query, description);

            let matchType = 'no match';
            if (titleSimilarity > 0.9) {
                matchType = 'exact match';
            } else if (titleSimilarity > 0.6 || descriptionSimilarity > 0.6) {
                matchType = 'partial match';
            }

            const { embedding, ...cleaned } = movie.toObject(); // remove embedding
            return { ...cleaned, similarity, matchType };
          })
          .sort((a, b) => {
            const propertyDifference = matchProperty[b.matchType] - matchProperty[a.matchType];
            if (propertyDifference !== 0) {
                return propertyDifference;
            }
            return b.similarity - a.similarity; // Sort by similarity if match types are the same
          })
          .slice(0, 5);
        
        // Log the results
        res.json(results)
    }
    catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const advancedSearch = async (req, res) => {
    const { title, genre, releasedYear, Director, rating } = req.body;

    try {
        const actualQuery = {}  
        if (title) actualQuery.title = { $regex: title, $options: 'i' };
        if (genre) actualQuery.genre = { $regex: genre, $options: 'i' };
        if (releasedYear) actualQuery.releasedYear = releasedYear;
        if (Director) actualQuery.Director = { $regex: Director, $options: 'i' };
        if (rating) actualQuery.rating = rating;

        const movies = await Movie.find(actualQuery).select('-embedding');


        res.json(movies);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}