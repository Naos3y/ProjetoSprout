-- AlterTable
ALTER TABLE "insideteacherhasinsidestrainings" ADD COLUMN     "uhitpending" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "insidetrainings" ALTER COLUMN "itstarted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "outsidetrainings" ALTER COLUMN "otstarted" SET DEFAULT false;
