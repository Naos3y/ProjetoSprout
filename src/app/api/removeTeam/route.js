import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { tid } = body;

    // Chamar a função para remover o departamento
    const result = await prisma.team.delete({
      where: {
        tid: parseInt(tid),
      },
    });

    console.log("Team removed successfully.");

    return NextResponse.json({
      code: 200,
      message: "Team removed successfully.",
      deletedDepartment: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: "An error occurred while removing team.",
      error: error.message,
    });
  }
}
