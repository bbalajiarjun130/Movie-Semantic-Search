const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const movies = require('./movies.json'); // path to your file
const API_KEY = process.env.OPENAI_API_KEY;
const EMBED_URL = "https://api.openai.com/v1/embeddings";

async function getEmbedding(text) {
  try {
    const response = await axios.post(EMBED_URL, {
      input: text,
      model: "text-embedding-ada-002",
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.data[0].embedding;
  } catch (error) {
    console.error("Failed to get embedding:", error.response?.data || error.message);
    return null;
  }
}

(async () => {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    console.log(`Embedding movie ${i + 1}/${movies.length}: ${movie.title}`);

    const embedding = await getEmbedding(movie.description);
    if (embedding) {
      movie.embedding = embedding;
    } else {
      movie.embedding = Array(1536).fill(0); // fallback
    }

    // Optional: Save every N movies to avoid losing progress
    if ((i + 1) % 10 === 0) {
      fs.writeFileSync('movies_with_real_embeddings.json', JSON.stringify(movies, null, 2));
    }
  }

  fs.writeFileSync('movies_with_real_embeddings.json', JSON.stringify(movies, null, 2));
})();
