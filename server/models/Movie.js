import mongoose from "mongoose";
import { type } from "os";


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    releasedYear: {
        type: Number,
        required: true,
    },
    Director: {
        type: String,
        trim: true,
    },
    Cast: {
        type: String,
        default: [],
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    },
    description: {
        type: String,
        required: true,
    },
    embedding: {
        type: [Number],
        validate: arr => arr.length === 1536,
        index: false
    }
});

export default mongoose.model('Movie', movieSchema);