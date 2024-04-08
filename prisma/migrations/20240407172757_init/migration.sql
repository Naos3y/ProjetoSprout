/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "uid" SERIAL NOT NULL,
    "ucountry" TEXT NOT NULL,
    "urole" TEXT NOT NULL,
    "teamtid" INTEGER,
    "uadminrights" INTEGER NOT NULL,
    "utype" TEXT NOT NULL,
    "uemployeenumber" TEXT NOT NULL,
    "uname" TEXT NOT NULL,
    "uphoto" TEXT NOT NULL,
    "udirectreport" TEXT,
    "ustartdate" TEXT NOT NULL,
    "ucity" TEXT NOT NULL,
    "uleader" TEXT,
    "useniority" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "userhasgroup" (
    "useruid" INTEGER NOT NULL,
    "groupgid" INTEGER NOT NULL,

    CONSTRAINT "userhasgroup_pkey" PRIMARY KEY ("useruid","groupgid")
);

-- CreateTable
CREATE TABLE "group" (
    "gid" SERIAL NOT NULL,
    "gname" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("gid")
);

-- CreateTable
CREATE TABLE "team" (
    "tid" SERIAL NOT NULL,
    "departmentdid" INTEGER,
    "tname" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("tid")
);

-- CreateTable
CREATE TABLE "department" (
    "did" SERIAL NOT NULL,
    "dname" TEXT NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "login" (
    "lid" SERIAL NOT NULL,
    "useruid" INTEGER,
    "lemail" TEXT NOT NULL,
    "lpassword" TEXT,

    CONSTRAINT "login_pkey" PRIMARY KEY ("lid")
);

-- CreateTable
CREATE TABLE "regularuser" (
    "ruid" SERIAL NOT NULL,
    "useruid" INTEGER NOT NULL,
    "trainingplanTrpid" INTEGER,

    CONSTRAINT "regularuser_pkey" PRIMARY KEY ("ruid")
);

-- CreateTable
CREATE TABLE "insideteacher" (
    "itrid" SERIAL NOT NULL,
    "useruid" INTEGER NOT NULL,

    CONSTRAINT "insideteacher_pkey" PRIMARY KEY ("itrid")
);

-- CreateTable
CREATE TABLE "outsideteacher" (
    "otrid" SERIAL NOT NULL,
    "otname" TEXT NOT NULL,

    CONSTRAINT "outsideteacher_pkey" PRIMARY KEY ("otrid")
);

-- CreateTable
CREATE TABLE "trainingplantemplate" (
    "trtid" SERIAL NOT NULL,
    "tptname" TEXT NOT NULL,
    "tptstarted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trainingplantemplate_pkey" PRIMARY KEY ("trtid")
);

-- CreateTable
CREATE TABLE "trainingplan" (
    "trpid" SERIAL NOT NULL,
    "tpstartingdate" TIMESTAMP(3) NOT NULL,
    "trainingplantemplatetrtid" INTEGER NOT NULL,

    CONSTRAINT "trainingplan_pkey" PRIMARY KEY ("trpid")
);

-- CreateTable
CREATE TABLE "insidetrainings" (
    "itid" SERIAL NOT NULL,
    "itname" TEXT NOT NULL,
    "itnumofmin" TEXT NOT NULL,
    "iteventtype" TEXT NOT NULL,
    "itminparticipants" TEXT NOT NULL,
    "itmaxparticipants" TEXT NOT NULL,
    "ittrainingarea" TEXT NOT NULL,
    "itdescription" TEXT,
    "itstarted" BOOLEAN NOT NULL,
    "itstartdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "insidetrainings_pkey" PRIMARY KEY ("itid")
);

-- CreateTable
CREATE TABLE "outsidetrainings" (
    "otid" SERIAL NOT NULL,
    "outsideteacherotid" INTEGER NOT NULL,
    "otname" TEXT NOT NULL,
    "otnumofmin" TEXT NOT NULL,
    "oteventtype" TEXT NOT NULL,
    "otminparticipants" TEXT NOT NULL,
    "otmaxparticipants" TEXT NOT NULL,

    CONSTRAINT "outsidetrainings_pkey" PRIMARY KEY ("otid")
);

-- CreateTable
CREATE TABLE "userhastrainingplans" (
    "regularuserruid" INTEGER NOT NULL,
    "trainingplantrpid" INTEGER NOT NULL,

    CONSTRAINT "userhastrainingplans_pkey" PRIMARY KEY ("regularuserruid","trainingplantrpid")
);

-- CreateTable
CREATE TABLE "regularuserhasoutsidetrainings" (
    "regularuserruid" INTEGER NOT NULL,
    "outsidetrainingsitid" INTEGER NOT NULL,
    "rotstartdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regularuserhasoutsidetrainings_pkey" PRIMARY KEY ("regularuserruid","outsidetrainingsitid")
);

-- CreateTable
CREATE TABLE "insideteacherhasinsidestrainings" (
    "insideteacheritrid" INTEGER NOT NULL,
    "insidestrainingsitid" INTEGER NOT NULL,

    CONSTRAINT "insideteacherhasinsidestrainings_pkey" PRIMARY KEY ("insideteacheritrid","insidestrainingsitid")
);

-- CreateTable
CREATE TABLE "regularuserhasinsidetrainings" (
    "regularuserruid" INTEGER NOT NULL,
    "insidetrainingsitid" INTEGER NOT NULL,
    "uhitmandatory" BOOLEAN DEFAULT false,
    "uhitpending" BOOLEAN DEFAULT true,

    CONSTRAINT "regularuserhasinsidetrainings_pkey" PRIMARY KEY ("regularuserruid","insidetrainingsitid")
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
CREATE UNIQUE INDEX "trainingplan_trpid_trainingplantemplatetrtid_key" ON "trainingplan"("trpid", "trainingplantemplatetrtid");

-- CreateIndex
CREATE UNIQUE INDEX "insidetrainings_itid_ittrainingarea_key" ON "insidetrainings"("itid", "ittrainingarea");

-- CreateIndex
CREATE UNIQUE INDEX "outsidetrainings_otid_outsideteacherotid_key" ON "outsidetrainings"("otid", "outsideteacherotid");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_teamtid_fkey" FOREIGN KEY ("teamtid") REFERENCES "team"("tid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhasgroup" ADD CONSTRAINT "userhasgroup_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhasgroup" ADD CONSTRAINT "userhasgroup_groupgid_fkey" FOREIGN KEY ("groupgid") REFERENCES "group"("gid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_departmentdid_fkey" FOREIGN KEY ("departmentdid") REFERENCES "department"("did") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login" ADD CONSTRAINT "login_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuser" ADD CONSTRAINT "regularuser_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuser" ADD CONSTRAINT "regularuser_trainingplanTrpid_fkey" FOREIGN KEY ("trainingplanTrpid") REFERENCES "trainingplan"("trpid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insideteacher" ADD CONSTRAINT "insideteacher_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplan" ADD CONSTRAINT "trainingplan_trainingplantemplatetrtid_fkey" FOREIGN KEY ("trainingplantemplatetrtid") REFERENCES "trainingplantemplate"("trtid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsidetrainings" ADD CONSTRAINT "outsidetrainings_outsideteacherotid_fkey" FOREIGN KEY ("outsideteacherotid") REFERENCES "outsideteacher"("otrid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhastrainingplans" ADD CONSTRAINT "userhastrainingplans_regularuserruid_fkey" FOREIGN KEY ("regularuserruid") REFERENCES "regularuser"("ruid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhastrainingplans" ADD CONSTRAINT "userhastrainingplans_trainingplantrpid_fkey" FOREIGN KEY ("trainingplantrpid") REFERENCES "trainingplan"("trpid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasoutsidetrainings" ADD CONSTRAINT "regularuserhasoutsidetrainings_regularuserruid_fkey" FOREIGN KEY ("regularuserruid") REFERENCES "regularuser"("ruid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasoutsidetrainings" ADD CONSTRAINT "regularuserhasoutsidetrainings_outsidetrainingsitid_fkey" FOREIGN KEY ("outsidetrainingsitid") REFERENCES "outsidetrainings"("otid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insideteacherhasinsidestrainings" ADD CONSTRAINT "insideteacherhasinsidestrainings_insideteacheritrid_fkey" FOREIGN KEY ("insideteacheritrid") REFERENCES "insideteacher"("itrid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insideteacherhasinsidestrainings" ADD CONSTRAINT "insideteacherhasinsidestrainings_insidestrainingsitid_fkey" FOREIGN KEY ("insidestrainingsitid") REFERENCES "insidetrainings"("itid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasinsidetrainings" ADD CONSTRAINT "regularuserhasinsidetrainings_regularuserruid_fkey" FOREIGN KEY ("regularuserruid") REFERENCES "regularuser"("ruid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasinsidetrainings" ADD CONSTRAINT "regularuserhasinsidetrainings_insidetrainingsitid_fkey" FOREIGN KEY ("insidetrainingsitid") REFERENCES "insidetrainings"("itid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplantemplatehasinsidetrainings" ADD CONSTRAINT "trainingplantemplatehasinsidetrainings_trainingplantemplat_fkey" FOREIGN KEY ("trainingplantemplatetrtid") REFERENCES "trainingplantemplate"("trtid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplantemplatehasinsidetrainings" ADD CONSTRAINT "trainingplantemplatehasinsidetrainings_insidetrainingsitid_fkey" FOREIGN KEY ("insidetrainingsitid") REFERENCES "insidetrainings"("itid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplantemplatehasoutsidetrainings" ADD CONSTRAINT "trainingplantemplatehasoutsidetrainings_trainingplantempla_fkey" FOREIGN KEY ("trainingplantemplatetrtid") REFERENCES "trainingplantemplate"("trtid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplantemplatehasoutsidetrainings" ADD CONSTRAINT "trainingplantemplatehasoutsidetrainings_outsidetrainingsot_fkey" FOREIGN KEY ("outsidetrainingsotid") REFERENCES "outsidetrainings"("otid") ON DELETE RESTRICT ON UPDATE CASCADE;
