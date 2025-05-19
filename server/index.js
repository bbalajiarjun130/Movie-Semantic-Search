import express from 'express';
import connectDB from './config/config.js';
import movieRoutes from './routes/movieRoutes.js';
import cors from 'cors';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
connectDB();

app.use(cors());

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Semantic Search API!');
});

// Use the movie routes
app.use('/api/movies', movieRoutes);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});