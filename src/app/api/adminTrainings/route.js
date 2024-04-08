import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      trainingName,
      numMin,
      eventType,
      minParticipants,
      maxParticipants,
      trainingArea,
      description,
    } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_insertTraining(
        ${trainingName}, ${numMin}, ${eventType}, ${minParticipants},
        ${maxParticipants}, ${trainingArea}, ${description}
      )`;

    return NextResponse.json({
      status: 201,
      message: "Training Added",
      data: result,
    });
  } catch (error) {
    console.error("Error adding training:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to add training",
      error: error.message,
    });
  }
}
