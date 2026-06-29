import { Router } from 'express';
import { Workout } from '../models/Workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const items = await Workout.find().lean();
  res.json({ resource: 'workouts', count: items.length, items });
});

export default workoutsRouter;
