import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.searchParams);

  try {
    const result = await prisma.$queryRaw`
      SELECT * FROM bruno_get_groups_departments_teams_by_training_id(${parseInt(
        params.get("id")
      )})`;

    if (result) {
      return NextResponse.json({
        status: 200,
        data: result,
      });
    } else {
      return NextResponse.json({
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to retrieve data",
      error: error.message,
    });
  }
}
