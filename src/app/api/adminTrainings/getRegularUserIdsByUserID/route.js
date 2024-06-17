import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);

    const userIdsArray = params
      .get("userids")
      .split(",")
      .map((id) => parseInt(id.trim(), 10));

    const result = await prisma.$queryRaw`
    SELECT public.bruno_get_regular_users_by_ids_updated(${userIdsArray})`;

    if (result) {
      return NextResponse.json({
        status: 200,
        message: "User IDs converted",
        userids: result[0].bruno_get_regular_users_by_ids_updated,
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Failed",
        error: "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error converting UserIDs:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to convert user IDs",
      error: error.message,
    });
  }
}
