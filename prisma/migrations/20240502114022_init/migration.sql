/*
  Warnings:

  - Added the required column `otstartdate` to the `outsidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otstarted` to the `outsidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nhoras` to the `regularuser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "insidetrainings" ADD COLUMN     "itlocation" TEXT,
ADD COLUMN     "itstarttime" TEXT;

-- AlterTable
ALTER TABLE "outsidetrainings" ADD COLUMN     "otdescription" TEXT,
ADD COLUMN     "otlocation" TEXT,
ADD COLUMN     "otstartdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "otstarted" BOOLEAN NOT NULL,
ADD COLUMN     "otstarttime" TEXT;

-- AlterTable
ALTER TABLE "regularuser" ADD COLUMN     "nhoras" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "ufirsttime" BOOLEAN NOT NULL DEFAULT true;
