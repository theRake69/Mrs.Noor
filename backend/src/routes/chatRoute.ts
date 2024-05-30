import express from "express";

// Internal Imports
import handler from "../controller/chat/sendMessage";

const router = express.Router();

router.post("/askQuestion", handler);

export default router;
