'use client';

import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
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
import { Controller, useForm, type Path } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import esLabels from 'react-phone-number-input/locale/es.json';
import 'react-phone-number-input/style.css';

const SUCCESS_MESSAGE =
  'Tu mensaje se envió correctamente. Te responderé pronto.';

const FALLBACK_ERROR = 'No se pudo enviar el mensaje. Intenta nuevamente.';

const phoneContainerClasses = cn(
  'flex min-h-11 items-center gap-3 rounded-xl border border-border bg-surface/60 px-3.5 text-sm',
  'transition-all duration-200',
  'hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-hover',
  'focus-within:-translate-y-0.5 focus-within:border-primary/70 focus-within:bg-surface-hover focus-within:shadow-md',
  '[&_.PhoneInputCountry]:mr-1 [&_.PhoneInputCountrySelect]:bg-transparent',
  '[&_.PhoneInputCountrySelectArrow]:opacity-60',
);

const phoneInputClasses = cn(
  'min-w-0 flex-1 border-0 bg-transparent p-0 m-0 text-foreground',
  'placeholder:text-foreground-subtle/60 outline-0',
);

const fieldLabel =
  'text-sm font-medium text-foreground-muted transition-colors group-focus-within:text-primary';

const cardShell =
  'border-border/60 bg-surface/60 rounded-3xl border p-7 shadow-xl backdrop-blur-sm lg:p-8';

type ContactFormProps = {
  onSend: (data: ContactFormData) => Promise<ContactSubmitResult>;
};

function applyServerFieldErrors(
  result: Extract<ContactSubmitResult, { ok: false }>,
  setError: (
    name: Path<ContactFormInput>,
    error: { type: string; message: string },
  ) => void,
) {
  if (result.code !== 'VALIDATION_ERROR' || !('details' in result)) {
    return false;
  }

  const details = result.details;
  if (!details) return false;

  let applied = false;

  for (const [field, messages] of Object.entries(details)) {
    const message = messages?.[0];
    if (!message) continue;
    setError(field as Path<ContactFormInput>, {
      type: 'server',
      message,
    });
    applied = true;
  }

  return applied;
}

export default function ContactForm({ onSend }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [lockedHeight, setLockedHeight] = useState<number>();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

  const countryLabels = esLabels;

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
      aria-labelledby={
        isSuccess ? 'contact-success-title' : 'contact-form-title'
      }
      style={{ minHeight: lockedHeight }}
      className={cn(cardShell, 'flex min-h-105 flex-col justify-center')}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSuccess ? (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() =>
              headingRef.current?.focus({ preventScroll: true })
            }
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <span className="bg-success/12 text-success ring-success/20 flex size-16 items-center justify-center rounded-full ring-1">
              <AppIcon
                category="ui"
                name="checkCircle"
                className="size-9"
                aria-hidden="true"
              />
            </span>
            <h2
              ref={headingRef}
              tabIndex={-1}
              id="contact-success-title"
              className="text-foreground mt-6 text-xl font-semibold tracking-tight outline-none sm:text-2xl"
            >
              Mensaje enviado
            </h2>
            <p className="text-foreground-muted mt-3 max-w-sm text-sm leading-relaxed sm:text-base">
              {SUCCESS_MESSAGE}
            </p>
            <Button
              variant="secondary"
              type="button"
              className="mt-8"
              onClick={handleSendAnother}
            >
              Enviar otro mensaje
            </Button>
          </motion.div>
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

              <label className="group grid gap-1.5">
                <span className={fieldLabel}>Teléfono</span>
                <Controller
                  name="contactNumber"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <PhoneInput
                      international
                      defaultCountry="CO"
                      labels={countryLabels}
                      name={name}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      ref={ref}
                      placeholder="Ej. 300 123 4567"
                      className={phoneContainerClasses}
                      numberInputProps={{ className: phoneInputClasses }}
                      aria-invalid={errors.contactNumber ? true : undefined}
                    />
                  )}
                />
                <AnimatePresence>
                  {errors.contactNumber?.message && (
                    <motion.p
                      key="phone-error"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="text-danger flex items-center gap-1 text-xs leading-relaxed"
                    >
                      <AppIcon
                        category="ui"
                        name="alert"
                        className="text-2xl"
                      />
                      {errors.contactNumber.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </label>

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
