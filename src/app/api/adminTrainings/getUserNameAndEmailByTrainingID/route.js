import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tid = searchParams.get("tid");

  if (!tid) {
    return NextResponse.json({
      status: 400,
      message: "Training ID is required",
    });
  }

  try {
    const result = await prisma.$queryRaw`
      SELECT * FROM bruno_get_usernames_and_email_by_tid(${parseInt(tid, 10)})`;

    return NextResponse.json({
      status: 200,
      users: result,
    });
  } catch (error) {
    console.error("Error fetching training users:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch training users",
      error: error.message,
    });
  }
}
