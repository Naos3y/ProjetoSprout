import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, startDate } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_startInsideTraining(${trainingID}, ${startDate})`;

    if (result[0]) {
      return NextResponse.json({
        status: 201,
        message: "Inside training started successfully",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to start inside training",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error starting inside training:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to start inside training",
      error: error.message,
    });
  }
}
