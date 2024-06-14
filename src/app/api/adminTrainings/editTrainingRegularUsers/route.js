import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, userIDs } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_associate_regular_users_to_training(CAST(${trainingID} AS INTEGER), ${userIDs})`;

    console.log("result regular users edit", result);

    if (result) {
      return NextResponse.json({
        status: 201,
        message: "Regular users edited successfully",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to edit regular users",
        error: "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error editing regular users:", error);
    return NextResponse.json({
      status: 500,
      message: "Error editing regular users:",
      error: error.message,
    });
  }
}
