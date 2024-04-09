/*
  Warnings:

  - You are about to drop the column `outsidetrainingsitid` on the `trainingplan` table. All the data in the column will be lost.
  - You are about to drop the column `locationlnid` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `rolerid` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `ufoto` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `upermission` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `ustartingdate` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[trainingplantrpid]` on the table `trainingtemplate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trtstartingdate` to the `trainingtemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uadminrights` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ucity` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ucountry` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uphoto` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urole` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useniority` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ustartdate` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "insidetrainings" DROP CONSTRAINT "insidetrainings_insideteacheritrid_fkey";

-- DropForeignKey
ALTER TABLE "login" DROP CONSTRAINT "login_useruid_fkey";

-- DropForeignKey
ALTER TABLE "outsidetrainings" DROP CONSTRAINT "outsidetrainings_outsideteacherotrid_fkey";

-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_departmentdid_fkey";

-- DropForeignKey
ALTER TABLE "trainingplan" DROP CONSTRAINT "trainingplan_insidetrainingsitid_fkey";

-- DropForeignKey
ALTER TABLE "trainingplan" DROP CONSTRAINT "trainingplan_outsidetrainingsitid_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_locationlnid_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_rolerid_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_teamtid_fkey";

-- AlterTable
ALTER TABLE "insidetrainings" ALTER COLUMN "insideteacheritrid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "login" ALTER COLUMN "useruid" DROP NOT NULL,
ALTER COLUMN "lpassword" DROP NOT NULL;

-- AlterTable
ALTER TABLE "outsidetrainings" ALTER COLUMN "outsideteacherotrid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "team" ALTER COLUMN "departmentdid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "trainingplan" DROP COLUMN "outsidetrainingsitid",
ADD COLUMN     "outsidetrainingsotid" INTEGER,
ADD COLUMN     "trpstarted" INTEGER,
ALTER COLUMN "insidetrainingsitid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "trainingtemplate" ADD COLUMN     "trtstartingdate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "locationlnid",
DROP COLUMN "rolerid",
DROP COLUMN "ufoto",
DROP COLUMN "upermission",
DROP COLUMN "ustartingdate",
ADD COLUMN     "uadminrights" INTEGER NOT NULL,
ADD COLUMN     "ucity" TEXT NOT NULL,
ADD COLUMN     "ucountry" TEXT NOT NULL,
ADD COLUMN     "uleader" TEXT,
ADD COLUMN     "uphoto" TEXT NOT NULL,
ADD COLUMN     "urole" TEXT NOT NULL,
ADD COLUMN     "useniority" TEXT NOT NULL,
ADD COLUMN     "ustartdate" TEXT NOT NULL,
ALTER COLUMN "teamtid" DROP NOT NULL,
ALTER COLUMN "utype" SET DATA TYPE TEXT,
ALTER COLUMN "udirectreport" DROP NOT NULL;

-- DropTable
DROP TABLE "location";

-- DropTable
DROP TABLE "role";

-- CreateTable
CREATE TABLE "regularuserhasinsidetrainings" (
    "insidetrainingsitid" INTEGER NOT NULL,
    "regularuserruid" INTEGER NOT NULL,
    "ritstartdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regularuserhasinsidetrainings_pkey" PRIMARY KEY ("insidetrainingsitid","regularuserruid")
);

-- CreateIndex
CREATE INDEX "fk_TrainingTemplate_TrainingPlan1_idx" ON "trainingtemplate"("trainingplantrpid");

-- CreateIndex
CREATE UNIQUE INDEX "trainingtemplate_trainingplantrpid_key" ON "trainingtemplate"("trainingplantrpid");

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_departmentdid_fkey" FOREIGN KEY ("departmentdid") REFERENCES "department"("did") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_teamtid_fkey" FOREIGN KEY ("teamtid") REFERENCES "team"("tid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login" ADD CONSTRAINT "login_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insidetrainings" ADD CONSTRAINT "insidetrainings_insideteacheritrid_fkey" FOREIGN KEY ("insideteacheritrid") REFERENCES "insideteacher"("itrid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsidetrainings" ADD CONSTRAINT "outsidetrainings_outsideteacherotrid_fkey" FOREIGN KEY ("outsideteacherotrid") REFERENCES "outsideteacher"("otrid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplan" ADD CONSTRAINT "trainingplan_insidetrainingsitid_fkey" FOREIGN KEY ("insidetrainingsitid") REFERENCES "insidetrainings"("itid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplan" ADD CONSTRAINT "trainingplan_outsidetrainingsotid_fkey" FOREIGN KEY ("outsidetrainingsotid") REFERENCES "outsidetrainings"("otid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasinsidetrainings" ADD CONSTRAINT "regularuserhasinsidetrainings_insidetrainingsitid_fkey" FOREIGN KEY ("insidetrainingsitid") REFERENCES "insidetrainings"("itid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasinsidetrainings" ADD CONSTRAINT "regularuserhasinsidetrainings_regularuserruid_fkey" FOREIGN KEY ("regularuserruid") REFERENCES "regularuser"("ruid") ON DELETE RESTRICT ON UPDATE CASCADE;
