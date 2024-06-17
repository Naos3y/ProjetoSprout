import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const groups = await prisma.group.findMany();
    return NextResponse.json({
      code: 200,
      data: groups,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
