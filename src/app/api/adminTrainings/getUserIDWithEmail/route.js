import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);

    console.log("params email: ", params.get("email"));

    const result = await prisma.$queryRaw`
    SELECT bruno_getUserIdWithEmail(${params.get("email")})`;

    console.log("getUserIDwith email result: ", result);

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
