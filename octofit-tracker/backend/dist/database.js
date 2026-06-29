import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
// Mongoose connection for the local octofit_db database.
export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
export const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await mongoose.connect(mongoUri);
};
export const disconnectFromDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        return;
    }
    await mongoose.disconnect();
};
