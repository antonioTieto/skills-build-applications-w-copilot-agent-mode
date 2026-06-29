import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Mongoose connection for the local octofit_db database.
// No-op metadata comment to trigger a repository commit without behavior changes.
export const mongoUri =
  process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

export const connectToDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(mongoUri);
};

export const disconnectFromDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
};
