'use client';

import type { ContactApiResponse } from '@/lib/contactApi';
import type { ContactFormData } from '@/lib/contactSchema';
import { cn } from '@/utilities/cn';
import { useState } from 'react';
import ContactForm from './ContactForm';

type FeedbackState =
  { type: 'success'; message: string } | { type: 'error'; message: string };

export default function ContactFormSection() {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const handleSubmitSuccess = async (
    data: ContactFormData,
  ): Promise<boolean> => {
    setFeedback(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      let result: ContactApiResponse;

      try {
        result = (await response.json()) as ContactApiResponse;
      } catch {
        setFeedback({
          type: 'error',
          message:
            'Ocurrió un error de red. Verifica tu conexión e inténtalo de nuevo.',
        });
        return false;
      }

      if (!response.ok || !result.ok) {
        const message =
          !result.ok && result.error
            ? result.error
            : 'No pudimos enviar tu mensaje. Revisa el formulario e inténtalo de nuevo.';

        setFeedback({ type: 'error', message });
        return false;
      }

      setFeedback({
        type: 'success',
        message: 'Tu mensaje se envió correctamente. Te responderé pronto.',
      });
      return true;
    } catch (error) {
      console.error('Error de red en formulario de contacto:', error);
      setFeedback({
        type: 'error',
        message:
          'Ocurrió un error de red. Verifica tu conexión e inténtalo de nuevo.',
      });
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {feedback && (
        <div
          role={feedback.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          className={cn(
            'flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm font-medium',
            feedback.type === 'success'
              ? 'border-success/30 bg-success/10 text-success'
              : 'border-danger/30 bg-danger/10 text-danger',
          )}
        >
          {feedback.type === 'success' ? (
            <svg
              className="mt-0.5 h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          ) : (
            <svg
              className="mt-0.5 h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <ContactForm onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
}
