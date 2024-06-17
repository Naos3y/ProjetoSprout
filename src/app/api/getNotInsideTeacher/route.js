import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const usersWithoutInsideTeacher = await prisma.user.findMany({
      include: {
        insideteacher: true,
        team: {
          include: {
            department: true,
          },
        },
        userhasgroup: true,
      },
    });

    const formattedUsers = usersWithoutInsideTeacher.map((user) => ({
      id: user.uid,
      uname: user.uname,
      utype: user.utype,
      uadminrights: user.uadminrights,
      uemployeenumber: user.uemployeenumber,
      urole: user.urole,
      useniority: user.useniority,
      uphoto: user.uphoto,
      uleader: user.uleader,
      ucountry: user.ucountry,
      ucity: user.ucity,
      ustartdate: user.ustartdate,
      team: {
        tid: user.team ? user.team.tid : 0,
        tname: user.team ? user.team.tname : "",
        departmentdid: user.team ? user.team.departmentdid : "",
      },

      isInsideTeacher: user.insideteacher.length > 0,
    }));

    const userData = {
      code: 200,
      data: formattedUsers,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
