import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, userIDs, teacherIDs, startDate } = body;
    console.log("training id: ", trainingID, typeof trainingID);
    console.log(
      "user ids: ",
      userIDs,
      Array.isArray(userIDs) ? "Array" : typeof userIDs
    );
    console.log(
      "teacherids: ",
      teacherIDs,
      Array.isArray(teacherIDs) ? "Array" : typeof teacherIDs
    );
    console.log("startdate: ", startDate, typeof startDate);

    const result = await prisma.$queryRaw`
      SELECT bruno_startInsideTrainingUpdated(${trainingID}, ${userIDs}, ${teacherIDs}, ${startDate})`;

    if (result) {
      return NextResponse.json({
        status: 201,
        message: "Training data inserted successfully",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to insert training data",
        error: "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error inserting training data:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to insert training data",
      error: error.message,
    });
  }
}
