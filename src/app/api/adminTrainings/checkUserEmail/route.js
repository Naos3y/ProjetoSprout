import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    const result = await prisma.$queryRaw`
      SELECT * FROM bruno_checkUserEmail(${email})`;

    if (result.length > 0 && result[0].emailfound) {
      return NextResponse.json({
        status: 200,
        message: "Email found",
        emailFound: "yes",
        userName: result[0].username,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Email not found",
      });
    }
  } catch (error) {
    console.error("Error checking email in training:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to check user email in training",
      error: error.message,
    });
  }
}
