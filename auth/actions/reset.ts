"use server";
import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  // if validation is not success error
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  // sending verification email if not verified
  const existingUser = await getUserByEmail(email);

  // if no existing user error not exist
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }
  // TODO: geneerate token and send email
  return { success: "Reset email sent!" };
};
