import { Request, Response } from "express";
import User from "../models/User";

// GET /api/users?englishLevel=&learningGoal=&country=&userId=
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { englishLevel, learningGoal, country, userId } = req.query;

    const filter: Record<string, any> = {};

    if (englishLevel) filter.englishLevel = englishLevel;
    if (learningGoal) filter.learningGoal = learningGoal;
    if (country) filter.country = country;

    // Exclude the requesting user from their own results, if provided
    if (userId) filter._id = { $ne: userId };

    const users = await User.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err: any) {
    console.error("getUsers error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};