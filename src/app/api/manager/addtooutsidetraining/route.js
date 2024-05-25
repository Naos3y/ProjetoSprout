import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);
    const tid = params.get("tid");
    const uid = params.get("uid");
    const sessionCookie =
      cookieHeader && cookieHeader.includes("session=")
        ? cookieHeader.split("session=")[1].split(";")[0]
        : "";

    if (sessionCookie) {
      const data =
        await prisma.$queryRaw`select * from add_to_outside_training(CAST(${tid} AS INTEGER), CAST(${uid} AS INTEGER))
        `;

      return NextResponse.json({
        code: 200,
        message: "Success",
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
