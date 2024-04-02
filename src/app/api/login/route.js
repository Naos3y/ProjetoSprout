import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({
        code: 400,
        message: "Email and password are required",
      });
    }

    const user = await prisma.login.findFirst({
      where: {
        lemail: email,
      },
      select: {
        lemail: true,
        lpassword: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        code: 400,
        message: "Incorrect email",
      });
    }

    const login =
      await prisma.$queryRaw`SELECT validate_password(${email}, ${password})`;

    if (!login[0].validate_password) {
      console.log("NOK");
      return NextResponse.json({
        code: 400,
        message: "Incorrect password",
      });
    } else if (login[0].validate_password) {
      console.log("OK");
      return NextResponse.json({
        code: 200,
        message: "Success",
      });
    }
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
