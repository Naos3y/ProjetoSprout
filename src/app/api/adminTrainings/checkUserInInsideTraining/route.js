import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { id } = request.query;

    const result = await prisma.$queryRaw`
      SELECT bruno_checkUsersInTraining(${id})`;

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
