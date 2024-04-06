import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function RegistUser(
  locationlnid: Number,
  role: Number,
  team: Number,
  upermission: string,
  utype: string,
  uemployeenumber: string,
  uname: string,
  ufoto: string,
  udirectreport: string,
  ustartingdate: string
) {
  try {
    const response = await prisma.user.create({
      data: {
        location: {
          connectOrCreate: {
            where: { lcountry: U_Pais, lcity: U_Cidade },
            create: { lcountry: U_Pais, lcity: U_Cidade },
          },
        },
        role: {
          connect: { rname: U_Role },
        },
        team: {
          connect: { tname: U_group },
        },
        upermission: U_permission,
        utype: U_Type,
        uemployeenumber: U_EmployeeNumber,
        uname: U_Name,
        ufoto: U_Foto,
        udirectreport: U_DirectReports,
        ustartingdate: U_StartingDate,
      },
    });

    return response;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

export async function Regist(credentials: Map<string, string>) {
  const U_Type = credentials.get("userType");
  const U_permission = credentials.get("adminRights");
  const U_EmployeeNumber = credentials.get("employeeNumber");
  const U_Role = credentials.get("role");
  const U_Seniority = credentials.get("seniority");
  const U_Name = credentials.get("completeName");
  const U_Foto = credentials.get("photo");
  const email = credentials.get("email");
  const U_group = credentials.get("groups");
  const U_Pais = credentials.get("country");
  const U_Cidade = credentials.get("city");
  const U_StartingDate = credentials.get("day");

  try {
    const response = await RegistUser(
      email,
      U_permission,
      U_Type,
      U_EmployeeNumber,
      U_Name,
      U_Foto,
      "", // Assuming U_DirectReports is not provided
      U_StartingDate,
      U_Pais,
      U_Cidade,
      U_Role,
      U_Seniority,
      U_group
    );

    if (response) {
      return "User registered successfully!";
    } else {
      return "Error registering user";
    }
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
