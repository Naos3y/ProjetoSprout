import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (user === null) {
      return NextResponse.json({
        status: 400,
        message: "Incorrect email",
      });
    } else {
      if (req.password !== user.password) {
        return NextResponse.json({
          status: 400,
          message: "Incorrect password",
        });
      } else {
        return NextResponse.json({
          status: 200,
          message: "Success",
        });
      }
    }
  } catch (error) {
  } finally {
  }
}
