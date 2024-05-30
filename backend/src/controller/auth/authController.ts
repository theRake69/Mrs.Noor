import { Request, Response } from "express";
import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword, verifyPassword, generateToken } from "../../auth";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password and role are required" });
  }

  try {
    const hashedPassword = hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role.toUpperCase() as UserRole, // Assuming role is a string enum value
      },
    });
    res.status(201).json({ message: "User registerd Successfully..!" });
  } catch (error) {
    console.error("error creating User: ", error);
    res.status(500).json({ message: "Internal Server error registering User" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && verifyPassword(password, user.password)) {
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      console.log("user logged in ", token);
      return res.status(200).json({ token });
    } else {
      // case where user is not found or password is incorrect
      return res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    console.error("error logging in the user", error);
    res.status(500).json("Internal server error in logging..!");
  }
};
