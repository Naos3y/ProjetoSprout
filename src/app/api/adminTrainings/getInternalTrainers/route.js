import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const result = await prisma.$queryRaw`
      SELECT bruno_getAllInsideTeacherNames() AS names`;
    //console.log(result);

    if (result[0]) {
      return NextResponse.json({
        status: 200,
        message: "Internal trainers found",
        trainers: result,
      });
    } else {
      return NextResponse.json({
        status: 200,
        message: "No internal trainers found",
        trainers: [],
      });
    }
  } catch (error) {
    console.error("Error retrieving internal trainers:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to retrieve internal trainers",
      error: error.message,
    });
  }
}
