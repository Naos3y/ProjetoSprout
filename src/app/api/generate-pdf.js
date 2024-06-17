// pages/api/generate-pdf.js
import { renderToStream } from "@react-pdf/renderer";
import CertificatePDF from "@/components/CertificatePDF";
export default async function handler(req, res) {
  const { userName, trainingName, date, trainers } = req.query;

  const document = (
    <CertificatePDF
      userName={userName}
      trainingName={trainingName}
      date={date}
      trainers={trainers}
    />
  );

  const stream = await renderToStream(document);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=certificate_${userName}.pdf`
  );

  stream.pipe(res);
  stream.end();
}
