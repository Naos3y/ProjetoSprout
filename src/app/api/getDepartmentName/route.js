import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { departmentdid } = await request.json();
    if (!departmentdid) {
      return NextResponse.json({
        code: 400,
        message: "Department ID is missing in the request body",
      });
    }

    const department = await prisma.team.findUnique({
      where: {
        tid: departmentdid, // Use o ID da equipe para procurar a equipe correspondente
      },
      select: {
        department: {
          select: {
            dname: true, // Seleciona apenas o nome do departamento associado à equipe
          },
        },
      },
    });

    if (!department) {
      return NextResponse.json({
        code: 404,
        message: "Department not found",
      });
    }

    return NextResponse.json({
      code: 200,
      data: department.department.dname, // Retorna o nome do departamento associado à equipe
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
