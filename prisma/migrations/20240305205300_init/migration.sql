/*
  Warnings:

  - You are about to drop the column `U_permission` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "U_permission",
ADD COLUMN     "U_perm" TEXT;
