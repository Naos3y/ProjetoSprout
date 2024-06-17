import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { gid } = body;

    // Chamar a função para remover o departamento
    const result = await prisma.group.delete({
      where: {
        gid: parseInt(gid),
      },
    });

    console.log("Group removed successfully.");

    return NextResponse.json({
      code: 200,
      message: "Group removed successfully.",
      deletedDepartment: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: "An error occurred while removing group.",
      error: error.message,
    });
  }
}
