import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);
    const info =
      await prisma.$queryRaw`SELECT * FROM get_essentials(${params.get(
        "email"
      )})`;
    return NextResponse.json({
      code: 200,
      message: info,
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "Server Error",
    });
  }
}
