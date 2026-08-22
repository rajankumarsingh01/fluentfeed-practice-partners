import { Router } from "express";
import {
  sendConnectionRequest,
  getConnections,
  updateConnectionStatus,
} from "../controllers/connections.controller";

const router = Router();

router.post("/", sendConnectionRequest);
router.get("/", getConnections);
router.put("/:id", updateConnectionStatus);

export default router;