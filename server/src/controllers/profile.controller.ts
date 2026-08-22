import { Request, Response } from "express";
import User from "../models/User";

// POST /api/profile — create a new profile
export const createProfile = async (req: Request, res: Response) => {
  try {
    const {
      name,
      englishLevel,
      learningGoal,
      nativeLanguage,
      country,
      preferredTime,
      bio,
    } = req.body;

    if (
      !name ||
      !englishLevel ||
      !learningGoal ||
      !nativeLanguage ||
      !country ||
      !preferredTime ||
      !bio
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.create({
      name,
      englishLevel,
      learningGoal,
      nativeLanguage,
      country,
      preferredTime,
      bio,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: user,
    });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(err.errors)
          .map((e: any) => e.message)
          .join(", "),
      });
    }
    console.error("createProfile error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating profile",
    });
  }
};

// GET /api/profile?userId=xxx — get a profile by id
export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId query param is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
      });
    }
    console.error("getProfile error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

// PUT /api/profile?userId=xxx — update a profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId query param is required",
      });
    }

    const allowedFields = [
      "name",
      "englishLevel",
      "learningGoal",
      "nativeLanguage",
      "country",
      "preferredTime",
      "bio",
    ];

    const updates: Record<string, any> = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(err.errors)
          .map((e: any) => e.message)
          .join(", "),
      });
    }
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format",
      });
    }
    console.error("updateProfile error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};