import express from 'express';
import {addMovies, advancedSearch, searchMovies} from '../controllers/movieController.js';

const router = express.Router();

router.post('/add-movie', addMovies);

router.post('/search', searchMovies);

router.post('/advanced-search', advancedSearch)

export default router;