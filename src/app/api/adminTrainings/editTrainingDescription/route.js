import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, description } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_edit_training_description(${trainingID}, ${description})`;

    if (result[0]) {
      return NextResponse.json({
        status: 201,
        message: "Description edited",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to edit description",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error editing description:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
