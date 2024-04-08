import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);
    const uid = params.get("uid");

    const user = await prisma.user.findFirst({
      where: {
        uid: uid,
      },
    });

    return NextResponse.json({
      code: 200,
      message: user,
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "Server Error",
    });
  }
}
