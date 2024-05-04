import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const logins = await prisma.login.findMany({
      include: {
        user: {
          include: {
            team: {
              include: {
                department: true,
              },
            },
            userhasgroup: true,
          },
        },
      },
    });

    const formattedUsers = logins.map(async (login) => {
      const user = login.user;
      let departmentName = "";
      let leaderName = "";
      let groupName = "";
      let userGroupID = 0;

      if (user.uleader) {
        const leader = await prisma.user.findUnique({
          where: {
            uid: parseInt(user.uleader),
          },
          select: {
            uname: true,
          },
        });

        leaderName = leader ? leader.uname : "";
      }

      if (user.team && user.team.departmentdid) {
        const dept = await prisma.department.findUnique({
          where: {
            did: parseInt(user.team.departmentdid),
          },
          select: {
            dname: true,
          },
        });

        departmentName = dept ? dept.dname : "";
      }

      let userGroupName = "";
      if (user.uid) {
        const userhasgrp = await prisma.userhasgroup.findFirst({
          where: {
            useruid: parseInt(user.uid),
          },
          select: {
            group: {
              select: {
                gid: true,
                gname: true,
              },
            },
          },
        });

        userGroupName = userhasgrp ? userhasgrp.group.gname : "";
        userGroupID = userhasgrp ? userhasgrp.group.gid : 0;
      }

      return {
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
        leaderName,
        login: {
          lemail: login.lemail ? login.lemail : "",
        },
        departmentName,
        groupName: userGroupName,
        groupID: userGroupID,
      };
    });

    const resolvedUsers = await Promise.all(formattedUsers);

    const userData = {
      code: 200,
      data: resolvedUsers,
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
