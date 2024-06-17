import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.searchParams);

  try {
    const result = await prisma.$queryRaw`
      SELECT * FROM bruno_get_inside_teachers_by_training_id(${parseInt(
        params.get("id")
      )})`;

    if (result) {
      return NextResponse.json({
        status: 200,
        teachers: result,
      });
    } else {
      return NextResponse.json({
        status: 404,
        teachers: [],
      });
    }
  } catch (error) {
    console.error("Error retrieving internal training teachers:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to retrieve internal training teachers",
      error: error.message,
    });
  }
}
