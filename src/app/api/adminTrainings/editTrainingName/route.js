import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, name } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_edit_training_name(${trainingID}, ${name})`;

    if (result[0]) {
      return NextResponse.json({
        status: 201,
        message: "name edited",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to edit name",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error editing name:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
