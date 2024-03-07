/*
  Warnings:

  - You are about to drop the column `U_Cidade` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_DirectReports` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_EmployeeNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_Foto` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_Name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_Pais` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_Role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_Seniority` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_StartingDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_Type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `U_group` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "U_Cidade",
DROP COLUMN "U_DirectReports",
DROP COLUMN "U_EmployeeNumber",
DROP COLUMN "U_Foto",
DROP COLUMN "U_Name",
DROP COLUMN "U_Pais",
DROP COLUMN "U_Role",
DROP COLUMN "U_Seniority",
DROP COLUMN "U_StartingDate",
DROP COLUMN "U_Type",
DROP COLUMN "U_group",
ADD COLUMN     "Ugroup" TEXT,
ADD COLUMN     "ucidade" TEXT,
ADD COLUMN     "udirectreports" TEXT,
ADD COLUMN     "uemployeenumber" TEXT,
ADD COLUMN     "ufoto" TEXT,
ADD COLUMN     "uname" TEXT,
ADD COLUMN     "upais" TEXT,
ADD COLUMN     "urole" TEXT,
ADD COLUMN     "useniority" TEXT,
ADD COLUMN     "ustartingdate" TIMESTAMP(3),
ADD COLUMN     "utype" TEXT;
