"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();

  const existingUser = await getUserByEmail(existingToken.email);

  // if no email exist
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  // else update email verified to new date and email to new email
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  //   delete verifcation token
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Email verified!" };
};