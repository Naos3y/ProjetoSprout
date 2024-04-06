import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const { departmentId } = req.query;

    if (!departmentId) {
      return NextResponse.json({
        code: 400,
        message: "Missing departmentId parameter",
      });
    }

    const teams = await prisma.team.findMany({
      where: {
        departmentId: parseInt(departmentId, 10),
      },
    });

    return NextResponse.json({
      code: 200,
      data: teams,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}

export async function handler(req, res) {
  if (req.method === "GET") {
    return GET(req, res);
  } else {
    return NextResponse.error(new Error("Method not allowed"), {
      statusCode: 405,
    });
  }
}
