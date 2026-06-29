import { model, Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13, max: 100 },
    fitnessLevel: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null }
}, { timestamps: true });
export const User = model('User', userSchema);
