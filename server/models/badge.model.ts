// Badge Interface and Schema
import mongoose, { Document, Schema, Model, Types } from 'mongoose';

interface IBadge extends Document {
  badgeImageUrl: string;
  title: string;
  description: string;
  name: string;
  courseName: string;
  courseId: Types.ObjectId; // Using Types.ObjectId for clarity and type safety
  createdAt: Date;
  updatedAt: Date;
}

const BadgeSchema: Schema<IBadge> = new mongoose.Schema({
  badgeImageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  courseName: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define model with explicit Model<IBadge> type to avoid casting issues
const Badge: Model<IBadge> = mongoose.model<IBadge>('Badge', BadgeSchema);
export default Badge;
