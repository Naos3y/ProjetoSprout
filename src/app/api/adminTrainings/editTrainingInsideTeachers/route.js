import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, teacherIDs } = body;

    const result = await prisma.$queryRaw`
      SELECT bruno_associate_regular_users_to_training(CAST(${trainingID} AS INTEGER), ${teacherIDs})`;

    console.log("inside teachers: ", result);

    if (result) {
      return NextResponse.json({
        status: 201,
        message: "inside teachers edited successfully",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to edit inside teachers",
        error: "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error editing inside teachers:", error);
    return NextResponse.json({
      status: 500,
      message: "Error editing inside teachers:",
      error: error.message,
    });
  }
}
