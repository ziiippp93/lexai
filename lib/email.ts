import nodemailer from "nodemailer";
import fs from "fs";

interface SendEmailOptions {
  to: string;
  name: string;
  applicationId: string;
  docType: string;
  pdfPath: string;
  docxPath: string;
}

const docTypeLabels: Record<string, string> = {
  crime: "Заявление о преступлении",
  prokuratura: "Заявление в прокуратуру",
  zhaloba: "Жалоба",
  isk: "Исковое заявление в суд",
};

export async function sendEmail(opts: SendEmailOptions) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const docLabel = docTypeLabels[opts.docType] || opts.docType;
  const shortId = opts.applicationId.slice(0, 8).toUpperCase();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: opts.to,
    subject: `LexAI — Ваш документ готов (#${shortId})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #8B1A1A; padding: 24px; text-align: center;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 24px;">LexAI</h1>
        </div>
        <div style="padding: 32px; background: #fff;">
          <h2 style="color: #2C2C2C;">Здравствуйте, ${opts.name}!</h2>
          <p style="color: #555;">Ваш документ готов и прикреплён к этому письму.</p>
          <div style="background: #F5F0E8; border-left: 4px solid #8B1A1A; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <strong style="color: #8B1A1A;">Тип документа:</strong>
            <p style="margin: 4px 0 0; color: #2C2C2C;">${docLabel}</p>
          </div>
          <p style="color: #555;">К письму приложены файлы:</p>
          <ul style="color: #555;">
            <li>PDF-версия документа</li>
            <li>Word-версия документа (для редактирования)</li>
          </ul>
          <p style="color: #888; font-size: 13px; margin-top: 32px;">
            Документ создан сервисом <strong>LexAI</strong>.<br>
            Если у вас есть вопросы — напишите нам на <a href="mailto:info@lexai.ru" style="color: #8B1A1A;">info@lexai.ru</a>
          </p>
        </div>
      </div>
    `,
    attachments: [
      { filename: `lexai-${shortId}.pdf`, content: fs.readFileSync(opts.pdfPath) },
      { filename: `lexai-${shortId}.docx`, content: fs.readFileSync(opts.docxPath) },
    ],
  });
}
