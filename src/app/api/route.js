import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const user = await prisma.user.findMany();
  return NextResponse.json({
    user: user,
  });
}
