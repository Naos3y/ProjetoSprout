/*
  Warnings:

  - You are about to drop the column `Ugroup` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Ugroup",
ADD COLUMN     "ugroup" TEXT;
