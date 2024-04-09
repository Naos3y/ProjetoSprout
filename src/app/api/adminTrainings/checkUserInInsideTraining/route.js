import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);

    const result = await prisma.$queryRaw`
      SELECT bruno_checkUsersInTraining(${params.get("id")})`;

    if (result[0]) {
      return NextResponse.json({
        status: 200,
        message: "Users found",
        usersFound: "yes",
      });
    }
  } catch (error) {
    console.error("Error checking users in training:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to check users in training",
      error: error.message,
    });
  }
}
