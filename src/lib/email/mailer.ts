import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
}

export async function sendMailDirect({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_SERVER_USER,
    to,
    replyTo: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    subject,
    html,
  });
}
