import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { decrypt } from "@/session/crypt";

const prisma = new PrismaClient();

export async function PATCH(request) {
  try {
    const body = await request.json();
    const cookieHeader = request.headers.get("cookie");
    const sessionCookie =
      cookieHeader && cookieHeader.includes("session=")
        ? cookieHeader.split("session=")[1].split(";")[0]
        : "";

    if (sessionCookie) {
      const decripted = await decrypt(sessionCookie);
      if (decripted) {
        const { id, password } = body;
        const query =
          await prisma.$queryRaw`SELECT edit_password(${id}, ${password})`;
        return NextResponse.json({
          code: 200,
          message: "success",
        });
      } else {
        return NextResponse.json({
          code: 404,
          message: "Unauthorized",
        });
      }
    } else {
      return NextResponse.json({
        code: 404,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "something went wrong",
    });
  }
}
