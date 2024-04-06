-- CreateTable
CREATE TABLE "Login" (
    "lid" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("lid")
);

-- CreateTable
CREATE TABLE "User" (
    "uid" SERIAL NOT NULL,
    "perm" TEXT,
    "utype" TEXT,
    "uemployeenumber" TEXT,
    "uname" TEXT,
    "ufoto" TEXT,
    "udirectreports" TEXT,
    "ustartingdate" TEXT,
    "upais" TEXT,
    "ucidade" TEXT,
    "urole" TEXT,
    "useniority" TEXT,
    "ugroup" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Login_email_key" ON "Login"("email");
