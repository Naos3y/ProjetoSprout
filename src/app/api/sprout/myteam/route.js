import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);
    const uid = params.get("uid");

    const cookieHeader = request.headers.get("cookie");
    const sessionCookie =
      cookieHeader && cookieHeader.includes("session=")
        ? cookieHeader.split("session=")[1].split(";")[0]
        : "";

    if (sessionCookie) {
      const team =
        await prisma.$queryRaw`SELECT * from getTeamInfo(CAST(${uid} AS INTEGER))`;

      return NextResponse.json({
        code: 200,
        message: team,
      });
    } else {
      return NextResponse.json({
        code: 404,
        message: "Unauthorized!",
      });
    }
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: error,
    });
  }
}
