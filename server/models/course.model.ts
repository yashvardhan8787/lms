import mongoose, { Schema, Document, Model } from 'mongoose';

// Review Interface and Schema
interface IReview extends Document {
  user: mongoose.Types.ObjectId; // User reference
  rating?: number;
  comment: string;
  commentReplies?: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number },
  comment: { type: String, required: true },
  commentReplies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Question Interface and Schema
interface IQuestion {
  [x: string]: any;
  questionText: string;
  options: string[];
  correctAnswer: number;
}

const QuestionSchema: Schema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }
});

// Quiz Interface and Schema
interface IQuiz extends Document {
  questions: IQuestion[];
  totalQuestions: number;
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema({
  questions: [QuestionSchema],
  totalQuestions: { type: Number, required: true },
  passingScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Lecture Interface and Schema
interface ILecture extends Document {
  title: string;
  description: string;
  thumbnailPicUrl: string;
  isVideoLecture: boolean;
  isQuiz: boolean;
  videoUrl?: string;
  quiz?: mongoose.Types.ObjectId;
  reviews: mongoose.Types.ObjectId[];
  duration: number; // Duration in minutes
  createdAt: Date;
  updatedAt: Date;
}

const LectureSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnailPicUrl: { type: String, required: true },
  isVideoLecture: { type: Boolean, required: true },
  isQuiz: { type: Boolean, required: true },
  videoUrl: { type: String },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Course Interface and Schema
interface ICourse extends Document {
  name: string;
  description: string;
  categories: string[];
  price: number;
  estimatedPrice: number;
  thumbnailUrl: string;
  tags: string[];
  level: string;
  demoUrl?: string;
  benefits: string[];
  prerequisites: string[];
  reviews: mongoose.Types.ObjectId[];
  purchased: number;
  rating?: number;
  lectures: mongoose.Types.ObjectId[];
  roadmapPicUrl: string;
  badges:  mongoose.Types.ObjectId[];
  totalQuizzes: number;
  totalLectures: number;
  totalDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: String, required: true }],
  price: { type: Number, required: true },
  estimatedPrice: { type: Number },
  thumbnailUrl: { type: String, required: true },
  tags: [{ type: String }],
  level: { type: String, required: true },
  demoUrl: { type: String },
  benefits: [{ type: String, required: true }],
  prerequisites: [{ type: String, required: true }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  purchased: { type: Number, default: 0 },
  rating: { type: Number },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
  roadmapPicUrl: { type: String },
  badges:[{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
  totalQuizzes: { type: Number, default: 0 },
  totalLectures: { type: Number, default: 0 },
  totalDuration: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// User Progress Interface and Schema
interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  lectureProgress: {
    lectureId: mongoose.Types.ObjectId;
    isCompleted: boolean;
    progressPercentage: number;
    quizStatus?: {
      isPassed: boolean;
      score: number;
    };
  }[];
  totalCompletedLectures: number;
  totalQuizzesPassed: number;
  streakUpdated: boolean;
  earnedBadges: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  lectureProgress: [{
    lectureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true },
    isCompleted: { type: Boolean, required: true },
    progressPercentage: { type: Number, required: true },
    quizStatus: {
      isPassed: { type: Boolean },
      score: { type: Number }
    }
  }],
  totalCompletedLectures: { type: Number, default: 0 },
  totalQuizzesPassed: { type: Number, default: 0 },
  streakUpdated: { type: Boolean, default: false },
  earnedBadges: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Model Exports
export const Review: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);
export const Quiz: Model<IQuiz> = mongoose.model<IQuiz>('Quiz', QuizSchema);
export const Lecture: Model<ILecture> = mongoose.model<ILecture>('Lecture', LectureSchema);
export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', CourseSchema);
export const UserProgress: Model<IUserProgress> = mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
