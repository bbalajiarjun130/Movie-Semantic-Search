import Movie from '../models/Movie.js';
import axios from 'axios';

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

        const results = movies.map(movie => {
            const similarity = cosineSimilarity(queryEmbedding, movie.embedding);
            const { embedding, ...cleaned } = movie.toObject(); // remove embedding
            return { ...cleaned, similarity };
          })
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 5);
        
        // Log the results
        res.json(results)
    }
    catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}