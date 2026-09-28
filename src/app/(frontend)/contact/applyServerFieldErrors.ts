import type { ContactSubmitResult } from '@/lib/contactApi';
import type { ContactFormInput } from '@/lib/contactSchema';
import type { Path, UseFormSetError } from 'react-hook-form';

type ContactFailure = Extract<ContactSubmitResult, { ok: false }>;

/**
 * Traduce los errores de validación del servidor a errores de campo.
 * Devuelve true si aplicó al menos uno.
 */
export function applyServerFieldErrors(
  result: ContactFailure,
  setError: UseFormSetError<ContactFormInput>,
): boolean {
  if (result.code !== 'VALIDATION_ERROR' || !('details' in result)) {
    return false;
  }

  const details = result.details;
  if (!details) return false;

  let applied = false;

  for (const [field, messages] of Object.entries(details)) {
    const message = messages?.[0];
    if (!message) continue;
    setError(field as Path<ContactFormInput>, { type: 'server', message });
    applied = true;
  }

  return applied;
}
