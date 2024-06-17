import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);

    const userId = params.get("uid");
    console.log("Received user ID:", userId);

    const result = await prisma.$queryRaw`
      SELECT public.bruno_get_regular_user_by_id_with_single_id(${parseInt(
        userId
      )})`;

    console.log("Result from function:", result);

    if (result.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "User ID converted",
        userids: result[0].bruno_get_regular_user_by_id_with_single_id,
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
