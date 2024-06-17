import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const teams = await prisma.team.findMany({
      include: {
        department: true, // Inclui os dados do departamento associado a cada equipe
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
