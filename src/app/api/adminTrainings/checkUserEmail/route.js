import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { email } = request.query;

    if (!email) {
      return NextResponse.json({
        status: 400,
        message: "Missing email parameter in request.",
      });
    }

    const result = await prisma.$queryRaw`
      SELECT bruno_checkUserEmail(${email})`;

    if (result[0]) {
      return NextResponse.json({
        status: 200,
        message: "Email found",
        emailFound: "yes",
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
