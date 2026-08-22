import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI as string;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI not set in .env");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};