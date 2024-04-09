import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
      where: {
        utype: "Leader", // Use um número, não uma string
      },
    });
    return NextResponse.json({
      code: 200,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
