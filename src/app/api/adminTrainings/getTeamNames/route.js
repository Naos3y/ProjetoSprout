import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
      SELECT * FROM public.bruno_getAllTeams()`;

    if (result[0]) {
      return NextResponse.json({
        status: 200,
        message: "Teams Found",
        trainers: result,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Teams NOT Found",
        trainers: [],
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to retrieve teams",
      error: error.message,
    });
  }
}
