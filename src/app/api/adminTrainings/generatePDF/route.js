import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

// ajuda com chat gpt
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
  const marginLeft = 50;
  const maxWidth = width - 2 * marginLeft;

  // Função para calcular a largura do texto
  const getTextWidth = (text, font, size) => font.widthOfTextAtSize(text, size);

  let yPosition = height - logoDims.height - 80;

  page.drawText("Sprout", {
    x: marginLeft,
    y: yPosition,
    size: 30,
    font: helveticaFont,
    color: rgb(0.53, 0.71, 0.13), // Cor verde #87B421
  });

  yPosition -= 50;
  page.drawText("Training Certificate", {
    x: marginLeft,
    y: yPosition,
    size: 20,
    font: helveticaFont,
  });

  yPosition -= 50;
  const initialText = "This certifies that ";
  const nameText = `${userName}`;
  const middleText = " has successfully completed the training ";
  const trainingText = `${trainingName}`;
  const dateText = ` on ${date}.`;

  let xPosition = marginLeft;

  // Desenhar partes do texto na mesma linha até atingir a largura máxima
  page.drawText(initialText, {
    x: xPosition,
    y: yPosition,
    size: 15,
    font: helveticaFont,
  });
  xPosition += getTextWidth(initialText, helveticaFont, 15);

  page.drawText(nameText, {
    x: xPosition,
    y: yPosition,
    size: 15,
    font: helveticaBoldFont,
  });
  xPosition += getTextWidth(nameText, helveticaBoldFont, 15);

  page.drawText(middleText, {
    x: xPosition,
    y: yPosition,
    size: 15,
    font: helveticaFont,
  });
  xPosition += getTextWidth(middleText, helveticaFont, 15);

  if (
    xPosition + getTextWidth(trainingText, helveticaBoldFont, 15) >
    marginLeft + maxWidth
  ) {
    yPosition -= 20;
    xPosition = marginLeft;
  }
  page.drawText(trainingText, {
    x: xPosition,
    y: yPosition,
    size: 15,
    font: helveticaBoldFont,
  });
  xPosition += getTextWidth(trainingText, helveticaBoldFont, 15);

  if (
    xPosition + getTextWidth(dateText, helveticaBoldFont, 15) >
    marginLeft + maxWidth
  ) {
    yPosition -= 20;
    xPosition = marginLeft;
  }
  page.drawText(dateText, {
    x: xPosition,
    y: yPosition,
    size: 15,
    font: helveticaBoldFont,
  });

  // Assinaturas
  yPosition -= 50;
  page.drawText("______________________________", {
    x: marginLeft,
    y: yPosition,
    size: 15,
    font: helveticaFont,
  });
  yPosition -= 20;
  page.drawText("Trainer Signature", {
    x: marginLeft,
    y: yPosition,
    size: 15,
    font: helveticaFont,
  });
  yPosition -= 30;
  page.drawText("______________________________", {
    x: marginLeft,
    y: yPosition,
    size: 15,
    font: helveticaFont,
  });
  yPosition -= 20;
  page.drawText("Sprout Signature", {
    x: marginLeft,
    y: yPosition,
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
