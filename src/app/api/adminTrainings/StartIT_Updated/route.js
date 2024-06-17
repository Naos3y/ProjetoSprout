import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { trainingID, date, time, location } = body;

    console.log("body:", body);
    console.log("training id: ", trainingID);
    console.log("date", date);
    console.log("time: ", time);
    console.log("location: ", location);

    const result = await prisma.$queryRaw`
      SELECT bruno_startIT(${trainingID}, ${date}, ${location}, ${time})`;

    if (result) {
      return NextResponse.json({
        status: 201,
        message: "Training Started",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed to start training",
        error: "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error starting traiing", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to insert training data",
      error: error.message,
    });
  }
}
