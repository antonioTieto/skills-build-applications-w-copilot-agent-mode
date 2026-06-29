import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
dotenv.config();
const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
const start = async () => {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
        console.log(`Backend listening on http://localhost:${port}`);
        console.log(`MongoDB URI: ${mongoUri}`);
    });
};
start().catch((error) => {
    console.error('Failed to start backend server:', error);
    process.exit(1);
});
