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
            userhasgroup: true, // Inclui os dados de userhasgroup diretamente
          },
        },
      },
    });

    // Mapear os resultados para formatar os dados como desejado
    const formattedUsers = logins.map(async (login) => {
      const user = login.user;
      let departmentName = ""; // Inicializa o nome do departamento como uma string vazia
      let leaderName = ""; // Inicializa o nome do líder como uma string vazia

      // Verifica se o usuário tem um líder associado
      if (user.uleader) {
        // Faça uma segunda pesquisa para obter o nome do líder com base no ID do líder
        const leader = await prisma.user.findUnique({
          where: {
            uid: parseInt(user.uleader),
          },
          select: {
            uname: true,
          },
        });
        // Se o líder existir, atribui o nome do líder à variável leaderName
        if (leader) {
          leaderName = leader.uname;
        } else {
          leaderName = "";
        }
      }

      // Verifica se o usuário tem um departamento associado à equipe
      if (user.team && user.team.departmentdid) {
        // Faça uma consulta para obter o nome do departamento com base no departmentdid
        const dept = await prisma.department.findUnique({
          where: {
            did: parseInt(user.team.departmentdid),
          },
          select: {
            dname: true,
          },
        });
        // Se o departamento existir, atribui o nome do departamento à variável departmentName
        if (dept) {
          departmentName = dept.dname;
        }
      }

      let userhasgroupIDgroup = "";
      let groupName = "";
      if (user.uid) {
        // Faça uma segunda pesquisa para obter o nome do líder com base no ID do líder
        const userhasgrp = await prisma.userhasgroup.findUnique({
          where: {
            useruid: parseInt(user.uid),
          },
          select: {
            groupgid: true,
          },
        });
        // Se o líder existir, atribui o nome do líder à variável leaderName
        if (userhasgrp) {
          userhasgroupIDgroup = userhasgrp.groupgid;

          const group = await prisma.group.findUnique({
            where: {
              gid: parseInt(userhasgrp.groupgid),
            },
            select: {
              gname: true,
            },
          });

          if (group) {
            groupName = group.gname;
          } else {
            groupName = "";
          }
        } else {
          userhasgroupIDgroup = "";
        }
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
          tname: user.team ? user.team.tname : "",
          departmentdid: user.team ? user.team.departmentdid : "",
        },
        leaderName: leaderName,
        login: {
          lemail: login.lemail ? login.lemail : "",
        },
        departmentName: departmentName,
        groupName: groupName,
      };
    });

    // Aguardar a resolução de todas as promises dentro do mapeamento
    const resolvedUsers = await Promise.all(formattedUsers);

    // Armazenar os dados em uma variável
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
