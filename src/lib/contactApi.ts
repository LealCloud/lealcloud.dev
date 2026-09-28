import type { ContactFormData } from './contactSchema';

export type ContactApiSuccess = {
  ok: true;
};

export type ContactApiErrorCode =
  'VALIDATION_ERROR' | 'INVALID_JSON' | 'SERVER_ERROR';

export type ContactSubmitErrorCode = ContactApiErrorCode | 'NETWORK_ERROR';

export type ContactApiError = {
  ok: false;
  code: ContactApiErrorCode;
  error: string;
  details?: Partial<Record<keyof ContactFormData, string[]>>;
};

export type ContactNetworkError = {
  ok: false;
  code: 'NETWORK_ERROR';
  error: string;
};

export type ContactApiResponse = ContactApiSuccess | ContactApiError;

export type ContactSubmitResult = ContactApiResponse | ContactNetworkError;
