import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET =
  process.env.JWT_SECRET || "MqnMlW1j+P1NLsm+f0te9yn1S1dGC9N6sX4xI75ScMg=";

//   Hashing password 10 rounds
export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

// verify password with hashedPassword
export const verifyPassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

// generate jwt token for a user
export const generateToken = (user: {
  id: number;
  email: string;
  role: string;
}) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// verify jwt token
export const verifyToken = (token: string) => {
  try {
    //   verify using jwt secret
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// get user from jwt from token
export const getUserFromToken = async (token: string) => {
  //   verifying token
  const decoded = verifyToken(token);
  if (!decoded) return null;

  // retriving user id from the database using user id extracted user from the token

  const user = await prisma.user.findUnique({
    //   exctracting user id from the decoded token
    where: { id: (decoded as any).userId },
    select: { id: true, email: true },
  });
  return user;
};
