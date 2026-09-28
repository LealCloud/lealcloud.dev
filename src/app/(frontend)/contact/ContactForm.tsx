'use client';

import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { PhoneField } from '@/components/ui/PhoneField';
import type { ContactSubmitResult } from '@/lib/contactApi';
import {
  contactSchema,
  type ContactFormData,
  type ContactFormInput,
} from '@/lib/contactSchema';
import { AppIcon } from '@/lib/icon-map';
import { cn } from '@/utilities/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { applyServerFieldErrors } from './applyServerFieldErrors';
import ContactSuccess, { SUCCESS_TITLE_ID } from './ContactSuccess';

const FALLBACK_ERROR = 'No se pudo enviar el mensaje. Intenta nuevamente.';

const cardShell =
  'border-border/60 bg-surface/60 rounded-3xl border p-7 shadow-xl backdrop-blur-sm lg:p-8';

type ContactFormProps = {
  onSend: (data: ContactFormData) => Promise<ContactSubmitResult>;
};

export default function ContactForm({ onSend }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [lockedHeight, setLockedHeight] = useState<number>();

  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      contactNumber: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);

    try {
      const result = await onSend(data);

      if (result.ok) {
        // Congela la altura actual para que la tarjeta de éxito
        // quede centrada en el eje Y sin colapsar.
        setLockedHeight(sectionRef.current?.offsetHeight);
        reset();
        setIsSuccess(true);
        return;
      }

      const appliedFieldErrors = applyServerFieldErrors(result, setError);
      setServerError(
        appliedFieldErrors
          ? 'Revisa los campos marcados e inténtalo de nuevo.'
          : (result.error ?? FALLBACK_ERROR),
      );
    } catch (error) {
      setServerError(error instanceof Error ? error.message : FALLBACK_ERROR);
    }
  };

  const handleSendAnother = () => {
    setServerError(null);
    setIsSuccess(false);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby={isSuccess ? SUCCESS_TITLE_ID : 'contact-form-title'}
      style={{ minHeight: lockedHeight }}
      className={cn(cardShell, 'flex min-h-105 flex-col justify-center')}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSuccess ? (
          <ContactSuccess key="success" onSendAnother={handleSendAnother} />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7">
              <span className="text-primary text-[0.7rem] font-extrabold tracking-[0.18em] uppercase">
                Contacto
              </span>
              <div className="mt-2 flex items-baseline gap-3">
                <h2
                  id="contact-form-title"
                  className="text-foreground text-lg font-semibold tracking-tight sm:text-xl"
                >
                  Envíame un mensaje
                </h2>
              </div>
            </div>

            <form
              noValidate
              className="grid gap-5 md:gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputField
                label="Nombre completo"
                type="text"
                autoComplete="name"
                placeholder="Ej. Juan Pérez"
                required={false}
                icon={<AppIcon category="ui" name="user" />}
                error={errors.name?.message}
                {...register('name')}
              />

              <InputField
                label="Correo electrónico"
                type="email"
                autoComplete="email"
                placeholder="juan@ejemplo.com"
                required={false}
                icon={<AppIcon category="social" name="email" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <PhoneField
                    label="Teléfono"
                    id="contactNumber"
                    error={errors.contactNumber?.message}
                    {...field}
                  />
                )}
              />

              <InputField
                label="Asunto"
                type="text"
                autoComplete="off"
                placeholder="Ej. Oportunidad laboral"
                required={false}
                icon={<AppIcon category="ui" name="text" />}
                error={errors.subject?.message}
                {...register('subject')}
              />

              <InputField
                label="Mensaje"
                multiline
                rows={5}
                placeholder="Cuéntame en qué puedo ayudarte o qué tienes en mente..."
                required={false}
                icon={<AppIcon category="ui" name="text" />}
                error={errors.message?.message}
                containerClassName="min-h-32"
                className="resize-y leading-relaxed"
                {...register('message')}
              />

              <AnimatePresence>
                {serverError && (
                  <motion.p
                    key="server-error"
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="border-danger/30 bg-danger/10 text-danger m-0 flex items-start gap-2 rounded-xl border p-2.5 text-sm leading-relaxed"
                  >
                    <AppIcon
                      category="ui"
                      name="alert"
                      className="mt-0.5 shrink-0 text-lg"
                    />
                    {serverError}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button
                variant="primary"
                type="submit"
                fullWidth
                className="mt-1 md:mt-2 md:w-auto md:self-end"
                disabled={isSubmitting || !isValid}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
