import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const mail = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

// cenas
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mail,
    pass,
  },
});

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const {
      userType,
      adminRights,
      employeeNumber,
      role,
      completeName,
      seniority,
      photo,
      email,
      startDate,
      selectedLeaderID,
      selectedTeamID,
      selectedGroupID,
      country,
      City,
      selectededReportTeamID,
    } = body;

    // Verificar se o utilizador já existe pelo email
    const userExists = await prisma.login.findFirst({
      where: {
        lemail: email,
      },
    });
    if (userExists) {
      return NextResponse.json({
        code: 400,
        message: "User already exists.",
      });
    }

    // Função para gerar uma senha aleatória
    function generateRandomPassword(length) {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    }

    const randomPassword = generateRandomPassword(10);

    // Inserir o novo utilizador
    const newUser = await prisma.user.create({
      data: {
        utype: userType,
        uadminrights: adminRights,
        uemployeenumber: employeeNumber,
        urole: role,
        uname: completeName,
        uleader: selectedLeaderID,
        udirectreport: selectededReportTeamID,
        useniority: seniority,
        uphoto: photo,
        ucountry: country,
        ucity: City,
        ustartdate: startDate,
        login: {
          create: {
            lemail: email,
            lpassword: randomPassword,
          },
        },
        team: {
          connect: {
            tid: selectedTeamID,
          },
        },
      },
    });

    if (selectedGroupID) {
      await prisma.userhasgroup.create({
        data: {
          useruid: newUser.uid,
          groupgid: selectedGroupID,
        },
      });
    }

    await prisma.regularuser.create({
      data: {
        useruid: newUser.uid,
      },
    });

    await transporter.sendMail({
      from: mail,
      to: email,
      subject: "Sprout Account",
      text: "Password",
      html: `<h1>Password of Sprout account</h1><p><b>Hi Sprout ${completeName}<b>, welcome to our platform to start learning</p><br><p>Login email: ${email}</p><p>Your password to log into your account is: ${randomPassword}</p><br><p>Happy learning, </p><p>Sprout Team!</p>`,
    });

    console.log("New user created:", newUser);

    return NextResponse.json({
      code: 200,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      code: 500,
      message: "Internal server error.",
    });
  }
}
