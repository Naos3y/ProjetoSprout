import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, userIDs } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_addUsersToInsideTraining(${trainingID}, ${userIDs})`;

    if (result[0]) {
      return NextResponse.json({
        status: 201,
        message: "Users added to inside training",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to add users to inside training",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error adding users to inside training:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
