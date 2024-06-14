import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function POST(request) {
  const { trainingName, userName, date } = await request.json();

  // Criação do documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // Tamanho A4
  const { width, height } = page.getSize();

  // Carregar fontes
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Carregar a imagem localmente
  const logoPath = path.resolve(
    "./src/app/api/adminTrainings/generatePDF/th.png"
  );
  const logoImageBytes = fs.readFileSync(logoPath);
  const logoImage = await pdfDoc.embedPng(logoImageBytes);
  const logoDims = logoImage.scale(0.5);

  // Adicionar imagem
  page.drawImage(logoImage, {
    x: width / 2 - logoDims.width / 2,
    y: height - logoDims.height - 20,
    width: logoDims.width,
    height: logoDims.height,
  });

  // Adicionar conteúdo ao PDF
  page.drawText("Sprout", {
    x: 50,
    y: height - logoDims.height - 80,
    size: 30,
    font: helveticaBoldFont,
    color: rgb(0.53, 0.71, 0.13), // Cor verde #87B421
  });
  page.drawText("Training Certificate", {
    x: 50,
    y: height - logoDims.height - 130,
    size: 20,
    font: helveticaFont,
  });
  page.drawText(
    `This certifies that ${userName} has successfully completed the training`,
    {
      x: 50,
      y: height - logoDims.height - 180,
      size: 15,
      font: helveticaFont,
    }
  );
  page.drawText(`${trainingName} on ${date}.`, {
    x: 50,
    y: height - logoDims.height - 230,
    size: 15,
    font: helveticaBoldFont,
  });
  page.drawText("______________________________", {
    x: 50,
    y: height - logoDims.height - 280,
    size: 15,
    font: helveticaFont,
  });
  page.drawText("Authorized Signature", {
    x: 50,
    y: height - logoDims.height - 300,
    size: 15,
    font: helveticaFont,
  });

  // Salvar o PDF
  const pdfBytes = await pdfDoc.save();

  // Enviar o PDF como resposta
  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
