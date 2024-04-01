/*
  Warnings:

  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Login";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "location" (
    "lnid" SERIAL NOT NULL,
    "lcity" TEXT NOT NULL,
    "lcountry" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("lnid")
);

-- CreateTable
CREATE TABLE "role" (
    "rid" SERIAL NOT NULL,
    "rname" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("rid")
);

-- CreateTable
CREATE TABLE "department" (
    "did" SERIAL NOT NULL,
    "dname" TEXT NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "team" (
    "tid" SERIAL NOT NULL,
    "departmentdid" INTEGER NOT NULL,
    "tname" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("tid")
);

-- CreateTable
CREATE TABLE "user" (
    "uid" SERIAL NOT NULL,
    "locationlnid" INTEGER NOT NULL,
    "rolerid" INTEGER NOT NULL,
    "teamtid" INTEGER NOT NULL,
    "upermission" TEXT NOT NULL,
    "utype" INTEGER NOT NULL,
    "uemployeenumber" TEXT NOT NULL,
    "uname" TEXT NOT NULL,
    "ufoto" TEXT NOT NULL,
    "udirectreport" TEXT NOT NULL,
    "ustartingdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "login" (
    "lid" SERIAL NOT NULL,
    "useruid" INTEGER NOT NULL,
    "lemail" TEXT NOT NULL,
    "lpassword" TEXT NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("lid")
);

-- CreateTable
CREATE TABLE "regularuser" (
    "ruid" SERIAL NOT NULL,
    "useruid" INTEGER NOT NULL,

    CONSTRAINT "regularuser_pkey" PRIMARY KEY ("ruid")
);

-- CreateTable
CREATE TABLE "insideteacher" (
    "itrid" SERIAL NOT NULL,
    "useruid" INTEGER NOT NULL,

    CONSTRAINT "insideteacher_pkey" PRIMARY KEY ("itrid")
);

-- CreateTable
CREATE TABLE "group" (
    "gid" SERIAL NOT NULL,
    "gname" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("gid")
);

-- CreateTable
CREATE TABLE "outsideteacher" (
    "otrid" SERIAL NOT NULL,
    "otname" TEXT NOT NULL,

    CONSTRAINT "outsideteacher_pkey" PRIMARY KEY ("otrid")
);

-- CreateTable
CREATE TABLE "insidetrainings" (
    "itid" SERIAL NOT NULL,
    "insideteacheritrid" INTEGER NOT NULL,
    "itname" TEXT NOT NULL,
    "itnumofmin" TEXT NOT NULL,
    "iteventtype" TEXT NOT NULL,
    "itminparticipants" TEXT NOT NULL,
    "itmaxparticipants" TEXT NOT NULL,

    CONSTRAINT "insidetrainings_pkey" PRIMARY KEY ("itid")
);

-- CreateTable
CREATE TABLE "outsidetrainings" (
    "otid" SERIAL NOT NULL,
    "outsideteacherotrid" INTEGER NOT NULL,
    "otname" TEXT NOT NULL,
    "otnumofmin" TEXT NOT NULL,
    "oteventtype" TEXT NOT NULL,
    "otminparticipants" TEXT NOT NULL,
    "otmaxparticipants" TEXT NOT NULL,

    CONSTRAINT "outsidetrainings_pkey" PRIMARY KEY ("otid")
);

-- CreateTable
CREATE TABLE "trainingplan" (
    "trpid" SERIAL NOT NULL,
    "insidetrainingsitid" INTEGER NOT NULL,
    "outsidetrainingsitid" INTEGER NOT NULL,

    CONSTRAINT "trainingplan_pkey" PRIMARY KEY ("trpid")
);

-- CreateTable
CREATE TABLE "userhasgroup" (
    "useruid" INTEGER NOT NULL,
    "groupgid" INTEGER NOT NULL,

    CONSTRAINT "userhasgroup_pkey" PRIMARY KEY ("useruid","groupgid")
);

-- CreateTable
CREATE TABLE "userhastrainings" (
    "regularuserruid" INTEGER NOT NULL,
    "trainingplantrpid" INTEGER NOT NULL,

    CONSTRAINT "userhastrainings_pkey" PRIMARY KEY ("regularuserruid","trainingplantrpid")
);

-- CreateTable
CREATE TABLE "regularuserhasoutsidetrainings" (
    "regularuserruid" INTEGER NOT NULL,
    "outsidetrainingsotid" INTEGER NOT NULL,
    "rotstartdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regularuserhasoutsidetrainings_pkey" PRIMARY KEY ("regularuserruid","outsidetrainingsotid")
);

-- CreateTable
CREATE TABLE "trainingtemplate" (
    "trtid" SERIAL NOT NULL,
    "trainingplantrpid" INTEGER NOT NULL,

    CONSTRAINT "trainingtemplate_pkey" PRIMARY KEY ("trtid")
);

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_departmentdid_fkey" FOREIGN KEY ("departmentdid") REFERENCES "department"("did") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_locationlnid_fkey" FOREIGN KEY ("locationlnid") REFERENCES "location"("lnid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_rolerid_fkey" FOREIGN KEY ("rolerid") REFERENCES "role"("rid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_teamtid_fkey" FOREIGN KEY ("teamtid") REFERENCES "team"("tid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login" ADD CONSTRAINT "login_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuser" ADD CONSTRAINT "regularuser_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insideteacher" ADD CONSTRAINT "insideteacher_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insidetrainings" ADD CONSTRAINT "insidetrainings_insideteacheritrid_fkey" FOREIGN KEY ("insideteacheritrid") REFERENCES "insideteacher"("itrid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsidetrainings" ADD CONSTRAINT "outsidetrainings_outsideteacherotrid_fkey" FOREIGN KEY ("outsideteacherotrid") REFERENCES "outsideteacher"("otrid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplan" ADD CONSTRAINT "trainingplan_insidetrainingsitid_fkey" FOREIGN KEY ("insidetrainingsitid") REFERENCES "insidetrainings"("itid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingplan" ADD CONSTRAINT "trainingplan_outsidetrainingsitid_fkey" FOREIGN KEY ("outsidetrainingsitid") REFERENCES "outsidetrainings"("otid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhasgroup" ADD CONSTRAINT "userhasgroup_useruid_fkey" FOREIGN KEY ("useruid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhasgroup" ADD CONSTRAINT "userhasgroup_groupgid_fkey" FOREIGN KEY ("groupgid") REFERENCES "group"("gid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhastrainings" ADD CONSTRAINT "userhastrainings_regularuserruid_fkey" FOREIGN KEY ("regularuserruid") REFERENCES "regularuser"("ruid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userhastrainings" ADD CONSTRAINT "userhastrainings_trainingplantrpid_fkey" FOREIGN KEY ("trainingplantrpid") REFERENCES "trainingplan"("trpid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasoutsidetrainings" ADD CONSTRAINT "regularuserhasoutsidetrainings_regularuserruid_fkey" FOREIGN KEY ("regularuserruid") REFERENCES "regularuser"("ruid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regularuserhasoutsidetrainings" ADD CONSTRAINT "regularuserhasoutsidetrainings_outsidetrainingsotid_fkey" FOREIGN KEY ("outsidetrainingsotid") REFERENCES "outsidetrainings"("otid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingtemplate" ADD CONSTRAINT "trainingtemplate_trainingplantrpid_fkey" FOREIGN KEY ("trainingplantrpid") REFERENCES "trainingplan"("trpid") ON DELETE RESTRICT ON UPDATE CASCADE;
