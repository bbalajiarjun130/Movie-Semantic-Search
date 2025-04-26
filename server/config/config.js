import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;