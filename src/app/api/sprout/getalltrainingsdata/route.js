import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const sessionCookie =
      cookieHeader && cookieHeader.includes("session=")
        ? cookieHeader.split("session=")[1].split(";")[0]
        : "";

    if (sessionCookie) {
      const data =
        await prisma.$queryRaw`select * from get_all_trainings_data()`;
      return NextResponse.json({
        code: 200,
        message: data,
      });
    } else {
      return NextResponse.json({
        code: 401,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: error,
    });
  }
}
