import mongoose, { Schema, Document } from "mongoose";

export type EnglishLevel = "Beginner" | "Intermediate" | "Advanced";

export type LearningGoal =
  | "IELTS"
  | "TOEFL"
  | "Job Interview"
  | "Daily Communication"
  | "Business English";

export interface IUser extends Document {
  name: string;
  englishLevel: EnglishLevel;
  learningGoal: LearningGoal;
  nativeLanguage: string;
  country: string;
  preferredTime: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    englishLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: [true, "English level is required"],
    },
    learningGoal: {
      type: String,
      enum: [
        "IELTS",
        "TOEFL",
        "Job Interview",
        "Daily Communication",
        "Business English",
      ],
      required: [true, "Learning goal is required"],
    },
    nativeLanguage: {
      type: String,
      required: [true, "Native language is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred practice time is required"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
      maxlength: [300, "Bio cannot exceed 300 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);