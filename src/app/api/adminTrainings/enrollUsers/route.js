import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request) {
  try {
    const body = await request.json();
    const { trainingID, userIDs } = body;

    // Extrai os IDs do array de objetos
    const userIdsArray = userIDs.map((user) => user.bruno_getuseridwithemail);

    console.log("user ids no enroll", userIdsArray);

    const result = await prisma.$queryRaw`
      SELECT bruno_enrollUsers(CAST(${trainingID} AS INTEGER), ${userIdsArray})`;

    console.log("resultado no enroll: ", result);

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
