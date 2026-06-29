import cors from 'cors';
import express from 'express';
import activitiesRouter from './routes/activities.js';
import { connectToDatabase, mongoUri } from './database.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api', (_req, res) => {
  res.json({
    baseUrl,
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/'
    ]
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

const start = async (): Promise<void> => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
    console.log(`MongoDB URI: ${mongoUri}`);
  });
};

start().catch((error: unknown) => {
  console.error('Failed to start backend server:', error);
  process.exit(1);
});
