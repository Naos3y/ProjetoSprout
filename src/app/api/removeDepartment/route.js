import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { did } = body;

    // REMOVER PRIMEIRO TODAS AS EQUIPAS ASSOCIADAS AO DEPARTAMENTO
    await prisma.team.deleteMany({
      where: {
        departmentdid: parseInt(did),
      },
    });

    // REMOVER O DEPARTAMENTO
    await prisma.department.delete({
      where: {
        did: parseInt(did),
      },
    });

    console.log("Department and associated teams removed successfully.");

    return NextResponse.json({
      code: 200,
      message: "Department and associated teams removed successfully.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message:
        "An error occurred while removing department and associated teams.",
      error: error.message,
    });
  }
}
