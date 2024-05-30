import { NextFunction, Request, Response } from "express";
import { getUserFromToken } from "../auth";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET;

interface jwtPayload {
  userId: number;
}

declare global {
  namespace Express {
    // Augment the Request interface to include a user property
    interface Request {
      // Define a user property that can hold user information
      user?: any;
    }
  }
}

export const authMiddleware = async (roles: string[]) => {
  // Returns an asynchronous middleware function that checks user authorization
  return async (req: Request, res: Response, next: NextFunction) => {
    // Extract the JWT token from Authorization the header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // call function to decode the token and retrieve user info
      const user = await getUserFromToken(token);
      // if no user or user has no role, respond with 403
      if (!user || !user.role) {
        return res.status(403).json({ message: "Forbidden" });
      }
      // assign the user object to the request object to make it available in subsequent middleware or route handlers
      req.user = user;
      // call the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};
