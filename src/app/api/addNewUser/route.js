import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const {
      upermission,
      utype,
      uemployeenumber,
      uname,
      ufoto,
      udirectreports,
      ustartingdate,
      upais,
      ucidade,
      role,
      useniority, // Adicionando a variável useniority
      lemail,
      ugroup,
    } = body;

    const user = await prisma.login.findFirst({
      where: {
        lemail: lemail,
      },
      select: {
        lemail: true,
      },
    });
    if (user) {
      return NextResponse.json({
        code: 400,
        message: "Utilizador JA EXISTE",
      });
    }

    const regist =
      await prisma.$queryRaw`SELECT insert_user(${lemail},${upermission},${utype},${uemployeenumber},${uname},${ufoto},${udirectreports},${ustartingdate},${upais},${ucidade},${role},${ugroup},${useniority})`;

    if (regist[0]) {
      console.log("OK");
      return NextResponse.json({
        code: 200,
        message: "Sucesso",
      });
    }
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
