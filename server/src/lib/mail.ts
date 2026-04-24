import nodemailer from "nodemailer";
import { env } from "../config/env";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
});

export async function sendEmail(to: string, subject: string, text: string) {
  return transporter.sendMail({ from: env.EMAIL_FROM, to, subject, text });
}
