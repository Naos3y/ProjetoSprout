import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request) {
  try {
    const body = await request.json();
    const { tid, email } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_remove_user_from_training(CAST(${tid} AS INTEGER), ${email})`;

    if (result) {
      return NextResponse.json({
        status: 201,
        message: "user removed",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to remove user",
        error: "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error removing user:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to remove user",
      error: error.message,
    });
  }
}
