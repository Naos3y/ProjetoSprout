import { renderToStream } from "@react-pdf/renderer";
import CertificatePDF from "@/components/CertificatePDF";

export default async function handler(req, res) {
  const { userName, trainingName, date } = req.query;

  console.log(userName);
  console.log(trainingName);
  console.log(date);

  const document = (
    <CertificatePDF
      userName={userName}
      trainingName={trainingName}
      date={date}
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
