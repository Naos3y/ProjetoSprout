/*
  Warnings:

  - You are about to drop the column `uhitpending` on the `insideteacherhasinsidestrainings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "insideteacherhasinsidestrainings" DROP COLUMN "uhitpending";

-- AlterTable
ALTER TABLE "regularuserhasoutsidetrainings" ADD COLUMN     "uhitpending" BOOLEAN DEFAULT true;
