import { Router } from 'express';
import { Team } from '../models/Team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  const items = await Team.find().populate('members', 'name email fitnessLevel').lean();
  res.json({ resource: 'teams', count: items.length, items });
});

export default teamsRouter;
