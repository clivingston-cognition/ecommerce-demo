import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { getUser } from "@/lib/auth/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { name, email, message, subject } = await request.json();

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
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const sanitizedName = escapeHtml(String(name));
  const sanitizedMessage = escapeHtml(String(message));

  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    replyTo: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
    subject: subject,
    html: ` 
            <p>Hello ${sanitizedName}!</p>
            <p>${sanitizedMessage}</p>
            `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "COULT NOT SEND THE MESSAGE" },
      { status: 500 }
    );
  }
}
