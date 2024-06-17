import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { teamName, departmentId } = body;

    // Verificar se o departamento existe
    const department = await prisma.department.findUnique({
      where: { did: departmentId },
    });

    if (!department) {
      return NextResponse.json({
        code: 404,
        message: "Department not found.",
      });
    }

    // Inserir a nova equipe
    const result = await prisma.team.create({
      data: {
        tname: teamName,
        department: { connect: { did: departmentId } }, // Conectar a equipe ao departamento
      },
    });

    if (result) {
      console.log("Team inserted successfully.");
      return NextResponse.json({
        code: 200,
        message: "Team inserted successfully.",
        team: result,
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
