import { model, Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekStart: { type: Date, required: true }
}, { timestamps: true });
leaderboardSchema.index({ weekStart: 1, rank: 1 }, { unique: true });
export const Leaderboard = model('Leaderboard', leaderboardSchema);
