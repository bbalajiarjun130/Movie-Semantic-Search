import express from 'express';
import {advancedSearch, searchMovies} from '../controllers/movieController.js';

const router = express.Router();

router.post('/search', searchMovies);

router.post('/advanced-search', advancedSearch)

export default router;