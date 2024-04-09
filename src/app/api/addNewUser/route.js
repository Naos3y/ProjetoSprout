import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const {
      userType,
      adminRights,
      employeeNumber,
      role,
      completeName,
      seniority,
      photo,
      email,
      startDate,
      selectedLeaderID,
      selectedTeamID,
      selectedGroupID,
      country,
      City,
      selectededReportTeamID,
    } = body;

    // Verificar se o utilizador já existe pelo email
    const userExists = await prisma.login.findFirst({
      where: {
        lemail: email,
      },
    });
    if (userExists) {
      return NextResponse.json({
        code: 400,
        message: "User already exists.",
      });
    }

    // Inserir o novo utilizador diretamente no banco de dados
    const newUser = await prisma.user.create({
      data: {
        utype: userType,
        uadminrights: adminRights,
        uemployeenumber: employeeNumber,
        urole: role,
        uname: completeName,
        uleader: selectedLeaderID,
        udirectreport: selectededReportTeamID,
        useniority: seniority,
        uphoto: photo,
        ucountry: country,
        ucity: City,
        ustartdate: startDate,
        login: {
          create: {
            lemail: email,
            lpassword: "ola",
          },
        },
        team: {
          connect: {
            tid: selectedTeamID,
          },
        },
      },
    });

    if (selectedGroupID) {
      await prisma.userhasgroup.create({
        data: {
          useruid: newUser.uid,
          groupgid: selectedGroupID,
        },
      });
    }

    await prisma.regularuser.create({
      data: {
        useruid: newUser.uid,
      },
    });

    console.log("New user created:", newUser);

    return NextResponse.json({
      code: 200,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      code: 500,
      message: "Internal server error.",
    });
  }
}
