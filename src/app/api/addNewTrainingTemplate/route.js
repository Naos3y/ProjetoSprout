import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  try {
    const { templateName, selectedTrainings } = body;

    // Criar o novo template de plano de treinamento
    const newTemplate = await prisma.trainingplantemplate.create({
      data: {
        tptname: templateName,
        tptstarted: false,
      },
    });

    if ((templateName == "") | (templateName == null)) {
      return NextResponse.json({
        code: 400,
        message: "Training template and trainings added successfully.",
        template: newTemplate,
        trainings: trainingRelations,
      });
    }

    // Adicionar os treinamentos internos selecionados ao template de plano de treinamento
    const trainingRelations = selectedTrainings.map((training) => {
      return {
        trainingplantemplatetrtid: newTemplate.trtid,
        insidetrainingsitid: training.itid,
        tptipriority: training.day, // Assume que `day` está incluído em cada objeto `training`
      };
    }); // Inserir as relações no banco de dados
    await prisma.trainingplantemplatehasinsidetrainings.createMany({
      data: trainingRelations,
    });

    return NextResponse.json({
      code: 200,
      message: "Training template and trainings added successfully.",
      template: newTemplate,
      trainings: trainingRelations,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
