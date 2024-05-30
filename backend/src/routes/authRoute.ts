const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
// internal imoports
import { registerUser, loginUser } from "../controller/auth/authController";
import { authMiddleware } from "../middleware/authMiddleware";

interface AuthenticatedRequest extends Request {
  user?: any; // Define a 'user' property on the Request object
}

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get(
  "/me",
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({ user: req.user });
    console.log(res);
  }
);

export default router;
