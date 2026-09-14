import type { ContactApiError, ContactApiResponse } from '@/lib/contactApi';
import { contactSchema } from '@/lib/contactSchema';
import { transporter } from '@/lib/mailer';
import { NextResponse } from 'next/server';

function buildEmailBody(data: {
  name: string;
  email: string;
  contactNumber?: string;
  subject: string;
  message: string;
}): string {
  const lines = [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.contactNumber ?? '—'}`,
    `Asunto: ${data.subject}`,
    '',
    'Mensaje:',
    data.message,
  ];

  return lines.join('\n');
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      const payload: ContactApiError = {
        ok: false,
        code: 'INVALID_JSON',
        error: 'El cuerpo de la solicitud no es JSON válido.',
      };

      return NextResponse.json<ContactApiResponse>(payload, { status: 400 });
    }

    // Usamos el esquema de Zod directamente de forma estática
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      console.warn(
        'Validación fallida en /api/contact:',
        result.error.flatten(),
      );

      const payload: ContactApiError = {
        ok: false,
        code: 'VALIDATION_ERROR',
        error: 'Los datos enviados no son válidos.',
        details: result.error.flatten().fieldErrors,
      };

      return NextResponse.json<ContactApiResponse>(payload, { status: 400 });
    }

    const data = result.data;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `[Contacto] ${data.subject} — ${data.name}`,
      text: buildEmailBody(data),
    });

    return NextResponse.json<ContactApiResponse>({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Error en /api/contact:', error);

    const payload: ContactApiError = {
      ok: false,
      code: 'SERVER_ERROR',
      error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.',
    };

    return NextResponse.json<ContactApiResponse>(payload, { status: 500 });
  }
}
