/*
  Warnings:

  - You are about to drop the column `insideteacheritrid` on the `insidetrainings` table. All the data in the column will be lost.
  - You are about to drop the column `outsideteacherotrid` on the `outsidetrainings` table. All the data in the column will be lost.
  - The primary key for the `regularuserhasinsidetrainings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ritstartdate` on the `regularuserhasinsidetrainings` table. All the data in the column will be lost.
  - The primary key for the `regularuserhasoutsidetrainings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `outsidetrainingsotid` on the `regularuserhasoutsidetrainings` table. All the data in the column will be lost.
  - You are about to drop the column `insidetrainingsitid` on the `trainingplan` table. All the data in the column will be lost.
  - You are about to drop the column `outsidetrainingsotid` on the `trainingplan` table. All the data in the column will be lost.
  - You are about to drop the column `trpstarted` on the `trainingplan` table. All the data in the column will be lost.
  - You are about to drop the `trainingtemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userhastrainings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[itid,ittrainingarea]` on the table `insidetrainings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[otid,outsideteacherotid]` on the table `outsidetrainings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trpid,trainingplantemplatetrtid]` on the table `trainingplan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itstartdate` to the `insidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itstarted` to the `insidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ittrainingarea` to the `insidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otstartdate` to the `outsidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otstarted` to the `outsidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outsideteacherotid` to the `outsidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outsidetrainingsitid` to the `regularuserhasoutsidetrainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tpstartingdate` to the `trainingplan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingplantemplatetrtid` to the `trainingplan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "insidetrainings" DROP CONSTRAINT "insidetrainings_insideteacheritrid_fkey";

-- DropForeignKey
ALTER TABLE "outsidetrainings" DROP CONSTRAINT "outsidetrainings_outsideteacherotrid_fkey";

-- DropForeignKey
ALTER TABLE "regularuserhasoutsidetrainings" DROP CONSTRAINT "regularuserhasoutsidetrainings_outsidetrainingsotid_fkey";

-- DropForeignKey
ALTER TABLE "trainingplan" DROP CONSTRAINT "trainingplan_insidetrainingsitid_fkey";

-- DropForeignKey
ALTER TABLE "trainingplan" DROP CONSTRAINT "trainingplan_outsidetrainingsotid_fkey";

-- DropForeignKey
ALTER TABLE "trainingtemplate" DROP CONSTRAINT "trainingtemplate_trainingplantrpid_fkey";

-- DropForeignKey
ALTER TABLE "userhastrainings" DROP CONSTRAINT "userhastrainings_regularuserruid_fkey";

-- DropForeignKey
ALTER TABLE "userhastrainings" DROP CONSTRAINT "userhastrainings_trainingplantrpid_fkey";

-- AlterTable
ALTER TABLE "insidetrainings" DROP COLUMN "insideteacheritrid",
ADD COLUMN     "itdescription" TEXT,
ADD COLUMN     "itlocation" TEXT,
ADD COLUMN     "itstartdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "itstarted" BOOLEAN NOT NULL,
ADD COLUMN     "itstarttime" TEXT,
ADD COLUMN     "ittrainingarea" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outsidetrainings" DROP COLUMN "outsideteacherotrid",
ADD COLUMN     "otdescription" TEXT,
ADD COLUMN     "otlocation" TEXT,
ADD COLUMN     "otstartdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "otstarted" BOOLEAN NOT NULL,
ADD COLUMN     "otstarttime" TEXT,
ADD COLUMN     "outsideteacherotid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "regularuser" ADD COLUMN     "nhoras" INTEGER,
ADD COLUMN     "trainingplanTrpid" INTEGER;

-- AlterTable
ALTER TABLE "regularuserhasinsidetrainings" DROP CONSTRAINT "regularuserhasinsidetrainings_pkey",
DROP COLUMN "ritstartdate",
ADD COLUMN     "uhitmandatory" BOOLEAN DEFAULT false,
ADD COLUMN     "uhitpending" BOOLEAN DEFAULT true,
ADD CONSTRAINT "regularuserhasinsidetrainings_pkey" PRIMARY KEY ("regularuserruid", "insidetrainingsitid");

-- AlterTable
ALTER TABLE "regularuserhasoutsidetrainings" DROP CONSTRAINT "regularuserhasoutsidetrainings_pkey",
DROP COLUMN "outsidetrainingsotid",
ADD COLUMN     "outsidetrainingsitid" INTEGER NOT NULL,
ADD CONSTRAINT "regularuserhasoutsidetrainings_pkey" PRIMARY KEY ("regularuserruid", "outsidetrainingsitid");

-- AlterTable
ALTER TABLE "trainingplan" DROP COLUMN "insidetrainingsitid",
DROP COLUMN "outsidetrainingsotid",
DROP COLUMN "trpstarted",
ADD COLUMN     "tpstartingdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "trainingplantemplatetrtid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "ufirsttime" BOOLEAN DEFAULT true;

-- DropTable
DROP TABLE "trainingtemplate";

-- DropTable
DROP TABLE "userhastrainings";

-- CreateTable
CREATE TABLE "trainingplantemplate" (
    "trtid" SERIAL NOT NULL,
    "tptname" TEXT NOT NULL,
    "tptstarted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trainingplantemplate_pkey" PRIMARY KEY ("trtid")
);

-- CreateTable
CREATE TABLE "userhastrainingplans" (
    "regularuserruid" INTEGER NOT NULL,
    "trainingplantrpid" INTEGER NOT NULL,

    CONSTRAINT "userhastrainingplans_pkey" PRIMARY KEY ("regularuserruid","trainingplantrpid")
);

-- CreateTable
CREATE TABLE "insideteacherhasinsidestrainings" (
    "insideteacheritrid" INTEGER NOT NULL,
    "insidestrainingsitid" INTEGER NOT NULL,

    CONSTRAINT "insideteacherhasinsidestrainings_pkey" PRIMARY KEY ("insideteacheritrid","insidestrainingsitid")
);

-- CreateTable
CREATE TABLE "trainingplantemplatehasinsidetrainings" (
    "trainingplantemplatetrtid" INTEGER NOT NULL,
    "insidetrainingsitid" INTEGER NOT NULL,
    "tptipriority" INTEGER,

    CONSTRAINT "trainingplantemplatehasinsidetrainings_pkey" PRIMARY KEY ("trainingplantemplatetrtid","insidetrainingsitid")
);

-- CreateTable
CREATE TABLE "trainingplantemplatehasoutsidetrainings" (
    "trainingplantemplatetrtid" INTEGER NOT NULL,
    "outsidetrainingsotid" INTEGER NOT NULL,

    CONSTRAINT "trainingplantemplatehasoutsidetrainings_pkey" PRIMARY KEY ("trainingplantemplatetrtid","outsidetrainingsotid")
);

-- CreateIndex
CREATE UNIQUE INDEX "insidetrainings_itid_ittrainingarea_key" ON "insidetrainings"("itid", "ittrainingarea");

-- CreateIndex
CREATE UNIQUE INDEX "outsidetrainings_otid_outsideteacherotid_key" ON "outsidetrainings"("otid", "outsideteacherotid");

-- CreateIndex
CREATE UNIQUE INDEX "trainingplan_trpid_trainingplantemplatetrtid_key" ON "trainingplan"("trpid", "trainingplantemplatetrtid");

-- AddForeignKey
ALTER TABLE "regularuser" ADD CONSTRAINT "regularuser_trainingplanTrpid_fkey" FOREIGN KEY ("trainingplanTrpid") REFERENCES "trainingplan"("trpid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplan" ADD CONSTRAINT "trainingplan_trainingplantemplatetrtid_fkey" FOREIGN KEY ("trainingplantemplatetrtid") REFERENCES "trainingplantemplate"("trtid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsidetrainings" ADD CONSTRAINT "outsidetrainings_outsideteacherotid_fkey" FOREIGN KEY ("outsideteacherotid") REFERENCES "outsideteacher"("otrid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhastrainingplans" ADD CONSTRAINT "userhastrainingplans_regularuserruid_fkey" FOREIGN KEY ("regularuserruid") REFERENCES "regularuser"("ruid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhastrainingplans" ADD CONSTRAINT "userhastrainingplans_trainingplantrpid_fkey" FOREIGN KEY ("trainingplantrpid") REFERENCES "trainingplan"("trpid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasoutsidetrainings" ADD CONSTRAINT "regularuserhasoutsidetrainings_outsidetrainingsitid_fkey" FOREIGN KEY ("outsidetrainingsitid") REFERENCES "outsidetrainings"("otid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insideteacherhasinsidestrainings" ADD CONSTRAINT "insideteacherhasinsidestrainings_insideteacheritrid_fkey" FOREIGN KEY ("insideteacheritrid") REFERENCES "insideteacher"("itrid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insideteacherhasinsidestrainings" ADD CONSTRAINT "insideteacherhasinsidestrainings_insidestrainingsitid_fkey" FOREIGN KEY ("insidestrainingsitid") REFERENCES "insidetrainings"("itid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplantemplatehasinsidetrainings" ADD CONSTRAINT "trainingplantemplatehasinsidetrainings_trainingplantemplat_fkey" FOREIGN KEY ("trainingplantemplatetrtid") REFERENCES "trainingplantemplate"("trtid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplantemplatehasinsidetrainings" ADD CONSTRAINT "trainingplantemplatehasinsidetrainings_insidetrainingsitid_fkey" FOREIGN KEY ("insidetrainingsitid") REFERENCES "insidetrainings"("itid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplantemplatehasoutsidetrainings" ADD CONSTRAINT "trainingplantemplatehasoutsidetrainings_trainingplantempla_fkey" FOREIGN KEY ("trainingplantemplatetrtid") REFERENCES "trainingplantemplate"("trtid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplantemplatehasoutsidetrainings" ADD CONSTRAINT "trainingplantemplatehasoutsidetrainings_outsidetrainingsot_fkey" FOREIGN KEY ("outsidetrainingsotid") REFERENCES "outsidetrainings"("otid") ON DELETE RESTRICT ON UPDATE CASCADE;
