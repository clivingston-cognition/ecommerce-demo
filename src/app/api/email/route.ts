import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const { name, email, message, subject, isHtml } = await request.json();

  if (!name || !email || !message || !subject) {
    return NextResponse.json(
      { message: "We need more information to send an email!" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const htmlBody = isHtml
    ? message
    : `
            <p>Hello ${escapeHtml(name)}!</p>
            <p>${escapeHtml(message)}</p>
            `;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    replyTo: process.env.PERSONAL_EMAIL,
    subject: subject,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "COULT NOT SEND THE MESSAGE" },
      { status: 500 }
    );
  }
}
