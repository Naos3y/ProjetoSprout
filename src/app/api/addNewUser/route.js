import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const {email,perm,utype,uemployeenumber,uname,ufoto,udirectreports,ustartingdate,upais,ucidade,urole,useniority,ugroup} = body;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return NextResponse.json({
        code: 400,
        message: "Utilizador JA EXISTE",
      });
    }

    const regist = await prisma.$queryRaw`SELECT insert_user(${email},${perm},${utype},${uemployeenumber},${uname},${ufoto},${udirectreports},${ustartingdate},${upais},${ucidade},${urole},${useniority},${ugroup})`;


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

