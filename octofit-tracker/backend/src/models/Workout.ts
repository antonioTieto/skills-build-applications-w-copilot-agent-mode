import { model, Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    targetMuscles: [{ type: String, required: true, trim: true }],
    description: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
export const Workout = model('Workout', workoutSchema);
