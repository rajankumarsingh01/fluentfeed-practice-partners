import { Request, Response } from "express";
import Connection from "../models/Connection";
import User from "../models/User";
import { getRandomMission } from "../data/missions";

// POST /api/connections — send a connection request
export const sendConnectionRequest = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "senderId and receiverId are required",
      });
    }

    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a connection request to yourself",
      });
    }

    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId),
    ]);

    if (!sender || !receiver) {
      return res.status(404).json({
        success: false,
        message: "Sender or receiver profile not found",
      });
    }

    const existing = await Connection.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Connection already exists with status: ${existing.status}`,
        data: existing,
      });
    }

    const connection = await Connection.create({ senderId, receiverId });

    return res.status(201).json({
      success: true,
      message: "Connection request sent",
      data: connection,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Connection request already exists",
      });
    }
    console.error("sendConnectionRequest error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while sending connection request",
    });
  }
};

// GET /api/connections?userId=xxx&type=incoming|connected|sent
export const getConnections = async (req: Request, res: Response) => {
  try {
    const { userId, type } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId query param is required",
      });
    }

    let filter: Record<string, any> = {};

    if (type === "incoming") {
      filter = { receiverId: userId, status: "pending" };
    } else if (type === "sent") {
      filter = { senderId: userId, status: "pending" };
    } else if (type === "connected") {
      filter = {
        status: "accepted",
        $or: [{ senderId: userId }, { receiverId: userId }],
      };
    } else {
      filter = { $or: [{ senderId: userId }, { receiverId: userId }] };
    }

    const connections = await Connection.find(filter)
      .populate("senderId", "name englishLevel learningGoal country")
      .populate("receiverId", "name englishLevel learningGoal country")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: connections.length,
      data: connections,
    });
  } catch (err: any) {
    console.error("getConnections error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching connections",
    });
  }
};

// PUT /api/connections/:id — accept or reject a request
export const updateConnectionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "status must be 'accepted' or 'rejected'",
      });
    }

    const connection = await Connection.findById(id);

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: "Connection request not found",
      });
    }

    if (connection.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Connection request already ${connection.status}`,
      });
    }

    connection.status = status;

    // Bonus Feature: assign a random practice mission when a connection is accepted
    if (status === "accepted") {
      connection.practiceMission = getRandomMission();
    }

    await connection.save();

    const populated = await connection.populate([
      { path: "senderId", select: "name englishLevel learningGoal country" },
      { path: "receiverId", select: "name englishLevel learningGoal country" },
    ]);

    return res.status(200).json({
      success: true,
      message: `Connection request ${status}`,
      data: populated,
    });
  } catch (err: any) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid connection id format",
      });
    }
    console.error("updateConnectionStatus error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating connection",
    });
  }
};