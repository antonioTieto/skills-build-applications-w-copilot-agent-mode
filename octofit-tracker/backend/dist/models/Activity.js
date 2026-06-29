import { model, Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workoutType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 10 },
    performedAt: { type: Date, required: true }
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);
