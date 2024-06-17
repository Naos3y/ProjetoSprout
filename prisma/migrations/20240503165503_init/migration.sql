-- AlterTable
ALTER TABLE "regularuser" ALTER COLUMN "nhoras" DROP NOT NULL;

-- AlterTable
ALTER TABLE "regularuserhasinsidetrainings" ADD COLUMN     "ritflag" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "regularuserhasoutsidetrainings" ADD COLUMN     "rotflag" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "ufirsttime" DROP NOT NULL;
