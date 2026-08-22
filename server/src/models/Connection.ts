import mongoose, { Schema, Document, Types } from "mongoose";

export type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface IConnection extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  status: ConnectionStatus;
  createdAt: Date;
}

const ConnectionSchema = new Schema<IConnection>({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate pending requests between same sender-receiver pair
ConnectionSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

export default mongoose.model<IConnection>("Connection", ConnectionSchema);