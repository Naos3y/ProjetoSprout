import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
      SELECT * FROM public.bruno_getAllOutsideTeachers()`;

    if (result[0]) {
      return NextResponse.json({
        status: 200,
        message: "External trainers found",
        trainers: result,
      });
    } else {
      return NextResponse.json({
        status: 200,
        message: "No external trainers found",
        trainers: [],
      });
    }
  } catch (error) {
    console.error("Error retrieving external trainers:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to retrieve external trainers",
      error: error.message,
    });
  }
}
