import { Router } from 'express';
import { Activity } from '../models/Activity.js';
const activitiesRouter = Router();
activitiesRouter.get('/', async (_req, res) => {
    const items = await Activity.find().populate('user', 'name email').lean();
    res.json({ resource: 'activities', count: items.length, items });
});
export default activitiesRouter;
