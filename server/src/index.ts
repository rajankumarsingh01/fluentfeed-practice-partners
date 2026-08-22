import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import profileRoutes from "./routes/profile.routes";
import matchesRoutes from "./routes/matches.routes";
import usersRoutes from "./routes/users.routes";
import connectionsRoutes from "./routes/connections.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "FluentFeed server is running" });
});

app.use("/api/profile", profileRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/connections", connectionsRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();