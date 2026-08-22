import { Request, Response } from "express";
import User, { IUser } from "../models/User";

// Calculates compatibility score between two users (max 100)
const calculateMatchScore = (currentUser: IUser, otherUser: IUser): number => {
  let score = 0;

  if (currentUser.learningGoal === otherUser.learningGoal) score += 40;
  if (currentUser.englishLevel === otherUser.englishLevel) score += 25;
  if (currentUser.preferredTime === otherUser.preferredTime) score += 20;
  if (currentUser.country === otherUser.country) score += 10;
  if (currentUser.nativeLanguage === otherUser.nativeLanguage) score += 5;

  return score;
};

// GET /api/matches?userId=xxx — top 5 compatible users
export const getMatches = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId query param is required",
      });
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    // Get all other users (exclude self)
const otherUsers = await User.find({ _id: { $ne: userId as string } })

    // Score each user
    const scoredUsers = otherUsers.map((otherUser) => {
      const score = calculateMatchScore(currentUser, otherUser);
      return {
        user: otherUser,
        matchScore: score,
        matchPercentage: score, // score is already out of 100
      };
    });

    // Sort by score descending, take top 5
    const topMatches = scoredUsers
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    return res.status(200).json({
      success: true,
      count: topMatches.length,
      data: topMatches,
    });
  } catch (err: any) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
      });
    }
    console.error("getMatches error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching matches",
    });
  }
};