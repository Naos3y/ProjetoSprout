import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.searchParams);

  try {
    const result = await prisma.$queryRaw`
      SELECT * FROM bruno_get_users_by_training_id(${parseInt(
        params.get("id")
      )})`;

    if (result) {
      return NextResponse.json({
        status: 200,
        users: result,
      });
    } else {
      return NextResponse.json({
        status: 404,
        users: [],
      });
    }
  } catch (error) {
    console.error("Error retrieving internal training users:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to retrieve internal training users",
      error: error.message,
    });
  }
}
