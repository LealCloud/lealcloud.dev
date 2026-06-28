import { z } from 'zod';

const noHtmlSubject = /^[^<>{}]*$/;
const noHtmlMessage = /^[^<>]*$/;

// Recibe el objeto t retornado por useTranslations / getTranslations
export const createContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, t('contact.validation.name.min'))
      .max(100, t('contact.validation.name.max'))
      .regex(/^[\p{L}\s'\-\.]+$/u, t('contact.validation.name.regex')),

    email: z
      .string()
      .trim()
      .email(t('contact.validation.email.format'))
      .max(254, t('contact.validation.email.max')),

    countryCode: z
      .string()
      .trim()
      .regex(/^\+\d{1,4}$/, t('contact.validation.countryCode.regex')),

    phone: z
      .string()
      .trim()
      .transform((val) => val.replace(/[\s\-().]/g, ''))
      .pipe(
        z.string().regex(/^\d{6,15}$/, t('contact.validation.phone.regex')),
      ),

    subject: z
      .string()
      .trim()
      .min(5, t('contact.validation.subject.min'))
      .max(150, t('contact.validation.subject.max'))
      .regex(noHtmlSubject, t('contact.validation.subject.regex')),

    message: z
      .string()
      .trim()
      .min(20, t('contact.validation.message.min'))
      .max(2000, t('contact.validation.message.max'))
      .regex(noHtmlMessage, t('contact.validation.message.regex')),
  });

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
