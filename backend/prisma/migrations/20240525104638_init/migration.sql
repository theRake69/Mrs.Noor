/*
  Warnings:

  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "name" "UserRole" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleId" SET DEFAULT 2;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
