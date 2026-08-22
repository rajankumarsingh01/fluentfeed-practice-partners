export type EnglishLevel = "Beginner" | "Intermediate" | "Advanced";

export type LearningGoal =
  | "IELTS"
  | "TOEFL"
  | "Job Interview"
  | "Daily Communication"
  | "Business English";

export type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface User {
  _id: string;
  name: string;
  englishLevel: EnglishLevel;
  learningGoal: LearningGoal;
  nativeLanguage: string;
  country: string;
  preferredTime: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData {
  name: string;
  englishLevel: EnglishLevel | "";
  learningGoal: LearningGoal | "";
  nativeLanguage: string;
  country: string;
  preferredTime: string;
  bio: string;
}

export interface Match {
  user: User;
  matchScore: number;
  matchPercentage: number;
}

export interface PracticeMission {
  topic: string;
  durationMinutes: number;
}

export interface Connection {
  _id: string;
  senderId: User;
  receiverId: User;
  status: ConnectionStatus;
  createdAt: string;
  practiceMission?: PracticeMission;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}