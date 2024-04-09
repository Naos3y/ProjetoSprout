import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    console.log(" +++++++++++++++++ " + email + " +++++++++++++++++ ");

    const result = await prisma.$queryRaw`
      SELECT bruno_checkUserEmail(${email})`;

    console.log(result[0]);

    if (result[0].bruno_checkuseremail) {
      return NextResponse.json({
        status: 200,
        message: "Email found",
        emailFound: "yes",
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Email not found",
      });
    }
  } catch (error) {
    console.error("Error checking email in training:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to check user email in training",
      error: error.message,
    });
  }
}
