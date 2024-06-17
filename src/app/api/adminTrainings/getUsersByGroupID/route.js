import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);

    const id = parseInt(params.get("id"));

    const result = await prisma.$queryRaw`
    SELECT bruno_getUsersByGroupId(${Number(id)})`;

    if (result[0]) {
      return NextResponse.json({
        status: 200,
        message: "Group found",
        groups: result,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Groups NOT Found",
        groups: [],
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to check users in groups",
      error: error.message,
    });
  }
}
