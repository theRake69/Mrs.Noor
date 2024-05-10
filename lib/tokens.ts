import { v4 as uuidv4 } from "uuid";

// internal import
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  // generating unique token
  const token = uuidv4();
  // expire token in 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  // check for exsting token
  const existingToken = await getVerificationTokenByEmail(email);

  // if existing token delete
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // else generate new token
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
