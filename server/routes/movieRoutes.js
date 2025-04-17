import express from 'express';
import {searchMovies} from '../controllers/movieController.js';

const router = express.Router();

router.post('/search', searchMovies);

export default router;