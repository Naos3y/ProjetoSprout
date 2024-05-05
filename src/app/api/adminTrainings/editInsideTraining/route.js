import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      id,
      trainingName,
      numMin,
      eventType,
      minParticipants,
      maxParticipants,
      trainingArea,
      description,
    } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_edit_training(${id},
        ${trainingName}, ${numMin}, ${eventType}, ${minParticipants},
        ${maxParticipants}, ${trainingArea}, ${description}
      )`;

    console.log(result);

    return NextResponse.json({
      status: 201,
      message: "Training Edited",
    });
  } catch (error) {
    console.error("Error editing training:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to edit training",
      error: error.message,
    });
  }
}
