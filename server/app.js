import express from 'express';
import connectDB from '../server/config/config.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
connectDB();

// Use the movie routes
app.use('/api/movies', movieRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Semantic Search API!');
});

// Start the server
const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});