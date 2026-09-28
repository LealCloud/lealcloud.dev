'use client';

import type {
  ContactApiResponse,
  ContactSubmitResult,
} from '@/lib/contactApi';
import type { ContactFormData } from '@/lib/contactSchema';
import ContactForm from './ContactForm';

const NETWORK_ERROR: Extract<ContactSubmitResult, { ok: false }> = {
  ok: false,
  code: 'NETWORK_ERROR',
  error:
    'Ocurrió un error de red. Verifica tu conexión e inténtalo de nuevo.',
};

function asSubmitResult(payload: unknown): ContactSubmitResult | null {
  if (!payload || typeof payload !== 'object' || !('ok' in payload)) {
    return null;
  }

  const result = payload as ContactApiResponse;
  if (result.ok === true) return result;
  if (result.ok === false && typeof result.error === 'string') {
    return result;
  }

  return null;
}

export default function ContactFormSection() {
  const handleSend = async (
    data: ContactFormData,
  ): Promise<ContactSubmitResult> => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      let payload: unknown;

      try {
        payload = await response.json();
      } catch {
        return NETWORK_ERROR;
      }

      const result = asSubmitResult(payload);

      if (result && !result.ok) {
        return result;
      }

      if (response.ok && result?.ok) {
        return result;
      }

      return {
        ok: false,
        code: 'SERVER_ERROR',
        error:
          'No pudimos enviar tu mensaje. Revisa el formulario e inténtalo de nuevo.',
      };
    } catch (error) {
      console.error('Error de red en formulario de contacto:', error);
      return NETWORK_ERROR;
    }
  };

  return <ContactForm onSend={handleSend} />;
}
