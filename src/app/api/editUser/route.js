import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const {
      id,
      userType,
      adminRights,
      role,
      seniority,
      completeName,
      selectedLeaderID,
      teamID,
      selectedGroupID,
      selectedCountry,
      selectedCitys,
    } = body;

    const updatedUser = await prisma.user.update({
      where: {
        uid: parseInt(id),
      },
      data: {
        utype: userType,
        uadminrights: adminRights,
        urole: role,
        useniority: seniority,
        uname: completeName,
        uleader: selectedLeaderID,
        team: {
          connect: {
            tid: teamID,
          },
        },
        ucountry: selectedCountry,
        ucity: selectedCitys,
      },
    });

    console.log("User updated:", updatedUser);

    return NextResponse.json({
      code: 200,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      code: 500,
      message: "Internal server error.",
    });
  }
}
