import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
      SELECT * FROM bruno_get_all_trainings()`;

    if (result) {
      return NextResponse.json({
        status: 200,
        message: "Inside Training Found",
        trainings: result,
      });
    } else {
      return NextResponse.json({
        status: 200,
        message: "No internal trainings found",
        trainings: [],
      });
    }
  } catch (error) {
    console.error("Error retrieving internal trainings:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to retrieve internal trainings",
      error: error.message,
    });
  }
}
