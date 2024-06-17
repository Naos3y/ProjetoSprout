import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { dname } = body;

    //INSERIR O DEPARTAMENTO
    const result = await prisma.department.create({
      data: {
        dname: dname,
      },
    });

    if (result) {
      console.log("Department inserted successfully.");
      return NextResponse.json({
        code: 200,
        message: "Department inserted successfully.",
        department: result, // RETORNA O DEPARTAMENTO INSERIDO
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
