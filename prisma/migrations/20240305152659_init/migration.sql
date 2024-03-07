/*
  Warnings:

  - Added the required column `U_Cidade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_DirectReports` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_EmployeeNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_Foto` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_Name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_Pais` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_Role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_Seniority` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_StartingDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_Type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_group` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `U_permission` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "U_Cidade" TEXT NOT NULL,
ADD COLUMN     "U_DirectReports" TEXT NOT NULL,
ADD COLUMN     "U_EmployeeNumber" TEXT NOT NULL,
ADD COLUMN     "U_Foto" TEXT NOT NULL,
ADD COLUMN     "U_Name" TEXT NOT NULL,
ADD COLUMN     "U_Pais" TEXT NOT NULL,
ADD COLUMN     "U_Role" TEXT NOT NULL,
ADD COLUMN     "U_Seniority" TEXT NOT NULL,
ADD COLUMN     "U_StartingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "U_Type" TEXT NOT NULL,
ADD COLUMN     "U_group" TEXT NOT NULL,
ADD COLUMN     "U_permission" INTEGER NOT NULL;
