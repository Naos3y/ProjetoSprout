import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { useruid } = body;

    const insideteacherExists = await prisma.insideteacher.findFirst({
      where: {
        useruid: useruid,
      },
    });
    if (insideteacherExists) {
      return NextResponse.json({
        code: 400,
        message: "insideteacher already exists.",
      });
    }

    const newInsideteacher = await prisma.insideteacher.create({
      data: {
        useruid: useruid,
      },
    });

    console.log("New insideteacher created:", newInsideteacher);

    return NextResponse.json({
      code: 200,
      message: "insideteacher created successfully.",
      data: newInsideteacher,
    });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      code: 500,
      message: "Internal server error.",
    });
  }
}
