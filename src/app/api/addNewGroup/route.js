import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { gname } = body;

    const result = await prisma.group.create({
      data: {
        gname: gname,
      },
    });

    console.log("Group inserted successfully.");

    if (result) {
      console.log("Group inserted successfully.");
      return NextResponse.json({
        code: 200,
        message: "Group inserted successfully.",
        group: result,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
