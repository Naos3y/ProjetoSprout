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

    console.log(
      trainingName,
      numMin,
      eventType,
      minParticipants,
      maxParticipants,
      trainingArea,
      description
    );

    const result = await prisma.$queryRaw`
      SELECT bruno_insertTraining(
        ${trainingName}, ${numMin}, ${eventType}, ${minParticipants},
        ${maxParticipants}, ${trainingArea}, ${description}
      ) AS id`;

    console.log(result);

    const trainingId = result[0]?.id.toString();
    console.log("id obtido post: " + trainingId + " .");

    return NextResponse.json({
      status: 201,
      message: "Training Added",
      id: trainingId,
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
