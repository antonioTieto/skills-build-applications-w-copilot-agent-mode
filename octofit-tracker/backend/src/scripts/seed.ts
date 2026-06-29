import { Activity } from '../models/Activity.js';
import {
  connectToDatabase,
  disconnectFromDatabase
} from '../config/database.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const seed = async (): Promise<void> => {
  await connectToDatabase();

  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const teams = await Team.insertMany([
    { name: 'Pacific Sprinters', city: 'Seattle', points: 1240, members: [] },
    { name: 'Andes Climbers', city: 'Quito', points: 1115, members: [] }
  ]);

  const users = await User.insertMany([
    {
      name: 'Lena Park',
      email: 'lena.park@octofit.dev',
      age: 29,
      fitnessLevel: 'advanced',
      team: teams[0]._id
    },
    {
      name: 'Mateo Rojas',
      email: 'mateo.rojas@octofit.dev',
      age: 34,
      fitnessLevel: 'intermediate',
      team: teams[1]._id
    },
    {
      name: 'Noah Miller',
      email: 'noah.miller@octofit.dev',
      age: 24,
      fitnessLevel: 'beginner',
      team: teams[0]._id
    }
  ]);

  await Promise.all([
    Team.updateOne(
      { _id: teams[0]._id },
      { $set: { members: [users[0]._id, users[2]._id] } }
    ),
    Team.updateOne(
      { _id: teams[1]._id },
      { $set: { members: [users[1]._id] } }
    )
  ]);

  await Workout.insertMany([
    {
      title: 'Tempo Run 5K',
      category: 'cardio',
      difficulty: 'intermediate',
      durationMinutes: 35,
      targetMuscles: ['legs', 'core'],
      description: 'Steady 5K pace run with warm-up and cooldown.'
    },
    {
      title: 'Upper Body Strength Circuit',
      category: 'strength',
      difficulty: 'advanced',
      durationMinutes: 45,
      targetMuscles: ['chest', 'shoulders', 'back', 'arms'],
      description: 'Circuit of push, pull, and overhead movements.'
    },
    {
      title: 'Mobility Reset Flow',
      category: 'mobility',
      difficulty: 'beginner',
      durationMinutes: 20,
      targetMuscles: ['hips', 'hamstrings', 'spine'],
      description: 'Low-impact flexibility flow for recovery days.'
    }
  ]);

  const now = new Date();
  await Activity.insertMany([
    {
      user: users[0]._id,
      workoutType: 'interval run',
      durationMinutes: 42,
      caloriesBurned: 510,
      performedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      user: users[1]._id,
      workoutType: 'strength training',
      durationMinutes: 50,
      caloriesBurned: 460,
      performedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000)
    },
    {
      user: users[2]._id,
      workoutType: 'brisk walk',
      durationMinutes: 30,
      caloriesBurned: 210,
      performedAt: now
    }
  ]);

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  await Leaderboard.insertMany([
    { user: users[0]._id, score: 980, rank: 1, weekStart },
    { user: users[1]._id, score: 910, rank: 2, weekStart },
    { user: users[2]._id, score: 640, rank: 3, weekStart }
  ]);

  console.log('Seed completed successfully.');
  await disconnectFromDatabase();
};

seed().catch(async (error: unknown) => {
  console.error('Seed failed:', error);
  await disconnectFromDatabase();
  process.exit(1);
});
