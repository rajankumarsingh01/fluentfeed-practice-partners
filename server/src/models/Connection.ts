import mongoose, { Schema, Document, Types } from "mongoose";

export type ConnectionStatus = "pending" | "accepted" | "rejected";

interface IPracticeMission {
  topic: string;
  durationMinutes: number;
}

export interface IConnection extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  status: ConnectionStatus;
  practiceMission?: IPracticeMission;
  createdAt: Date;
}

const PracticeMissionSchema = new Schema<IPracticeMission>(
  {
    topic: { type: String, required: true },
    durationMinutes: { type: Number, required: true, default: 5 },
  },
  { _id: false }
);

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
  practiceMission: {
    type: PracticeMissionSchema,
    default: undefined,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ConnectionSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

export default mongoose.model<IConnection>("Connection", ConnectionSchema);