-- AlterTable
ALTER TABLE "insidetrainings" ALTER COLUMN "itstarted" SET DEFAULT false,
ALTER COLUMN "itstartdate" DROP NOT NULL,
ALTER COLUMN "itstartdate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "regularuserhasoutsidetrainings" ALTER COLUMN "rotstartdate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "trainingplan" ALTER COLUMN "tpstartingdate" SET DATA TYPE TEXT;
