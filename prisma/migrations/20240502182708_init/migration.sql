-- AlterTable
ALTER TABLE "insidetrainings" ALTER COLUMN "itstartdate" DROP NOT NULL,
ALTER COLUMN "itstartdate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "outsidetrainings" ALTER COLUMN "otstartdate" DROP NOT NULL,
ALTER COLUMN "otstartdate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "regularuserhasoutsidetrainings" ALTER COLUMN "rotstartdate" DROP NOT NULL,
ALTER COLUMN "rotstartdate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "trainingplan" ALTER COLUMN "tpstartingdate" DROP NOT NULL,
ALTER COLUMN "tpstartingdate" SET DATA TYPE TEXT;
