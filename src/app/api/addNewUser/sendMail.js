import nodemailer from "nodemailer";

// Função para enviar e-mails
async function sendMailFunction(service, email, password, subject, text) {
  try {
    // Configuração do transporte
    const transporter = createTransporter(service, email, password);

    // Opções do e-mail
    const mailOptions = {
      from: "projetosprout2024@gmail.com", // Endereço de e-mail remetente
      to: email, // Endereço de e-mail destinatário (o mesmo do remetente, neste caso)
      subject, // Assunto do e-mail
      text, // Conteúdo do e-mail em texto simples
    };

    // Enviar e-mail
    await transporter.sendMail(mailOptions);

    console.log("E-mail enviado com sucesso.");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
}

// Função para configurar o transporte do nodemailer
function createTransporter(service, email, password) {
  let transporter;

  // Configuração do transporte com base no serviço de e-mail
  switch (service) {
    case "gmail":
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "projetosprout2024@gmail.com", // Seu endereço de e-mail do Gmail
          pass: "ola123sprout", // Sua senha do Gmail
        },
      });
      break;
    default:
      throw new Error("Serviço de e-mail não suportado");
  }

  return transporter;
}

export default sendMailFunction;
