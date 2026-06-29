import { Router } from 'express';
import { User } from '../models/User.js';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const items = await User.find().populate('team', 'name city').lean();
  res.json({ resource: 'users', count: items.length, items });
});

export default usersRouter;
