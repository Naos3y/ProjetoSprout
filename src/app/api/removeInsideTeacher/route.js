import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { useruid } = body;

    const insideteacher = await prisma.insideteacher.findFirst({
      where: {
        useruid: useruid,
      },
    });

    if (!insideteacher) {
      return NextResponse.json({
        code: 400,
        message: "Inside teacher not found.",
      });
    }

    await prisma.insideteacher.delete({
      where: {
        itrid: insideteacher.itrid,
      },
    });

    console.log("Inside teacher desassociated successfully.");

    return NextResponse.json({
      code: 200,
      message: "Inside teacher desassociated successfully.",
    });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      code: 500,
      message: "Internal server error.",
    });
  }
}
