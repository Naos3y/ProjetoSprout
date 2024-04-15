import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, trainerIDs } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_addTrainersToInsideTraining(${trainingID}, ${trainerIDs})`;

    if (result[0]) {
      return NextResponse.json({
        status: 201,
        message: "Trainers added to inside training",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to add trainers to inside training",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error adding trainers to inside training:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to add trainers to inside training",
      error: error.message,
    });
  }
}
