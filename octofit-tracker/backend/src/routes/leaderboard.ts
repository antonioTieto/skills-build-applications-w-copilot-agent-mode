import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const items = await Leaderboard.find()
    .populate('user', 'name email fitnessLevel')
    .sort({ weekStart: -1, rank: 1 })
    .lean();

  res.json({ resource: 'leaderboard', count: items.length, items });
});

export default leaderboardRouter;
