import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";


// Defining types for the User
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
