import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);

    const result = await prisma.$queryRaw`
    SELECT bruno_getUserIdWithEmail(${params.get("email")})`;

    if (result[0]) {
      return NextResponse.json({
        status: 200,
        message: "User found",
        emails: result,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "User NOT Found",
        emails: [],
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to check users",
      error: error.message,
    });
  }
}
