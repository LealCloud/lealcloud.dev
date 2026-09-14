import nodemailer from 'nodemailer';

const requiredEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'CONTACT_TO_EMAIL',
  'EMAIL_FROM',
] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Falta la variable de entorno: ${key}`);
  }
}

const smtpPort = Number(process.env.SMTP_PORT);

if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
  throw new Error('SMTP_PORT debe ser un entero positivo.');
}

const smtpSecure = process.env.SMTP_SECURE === 'true';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  // true  → puerto 465 (SSL/TLS implícito)
  // false → puerto 587/25 (STARTTLS negociado por el servidor)
  secure: smtpSecure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
