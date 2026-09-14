'use client';

import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import {
  type ContactFormData,
  type ContactFormInput,
  contactSchema,
} from '@/lib/contactSchema';
import { AppIcon } from '@/lib/icon-map';
import { cn } from '@/utilities/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import esLabels from 'react-phone-number-input/locale/es.json';
import 'react-phone-number-input/style.css';

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

type MessageType = 'success' | 'error' | '';

type ContactFormProps = {
  onSubmitSuccess: (data: ContactFormData) => boolean | Promise<boolean>;
};

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('');

  const {
    register,
    handleSubmit,
    control,
    reset,
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
    setMessage('');
    setMessageType('');

    try {
      const success = await onSubmitSuccess(data);

      if (success) {
        setMessage('Mensaje enviado correctamente. Te responderé pronto.');
        setMessageType('success');
        reset();
      } else {
        setMessage('No se pudo enviar el mensaje. Intenta nuevamente.');
        setMessageType('error');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'No se pudo enviar el mensaje. Intenta nuevamente.';
      setMessage(errorMessage);
      setMessageType('error');
    }
  };

  return (
    <section
      aria-labelledby="contact-form-title"
      className="border-border/60 bg-surface/60 rounded-3xl border p-7 shadow-xl backdrop-blur-sm lg:p-8"
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
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
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
                key="error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="text-danger flex items-center gap-1 text-xs leading-relaxed"
              >
                <AppIcon category="ui" name="alert" className="text-2xl" />
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
          {message && (
            <motion.p
              key="status"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'm-0 rounded-xl border p-2.5 text-sm leading-relaxed',
                messageType === 'success'
                  ? 'border-success/30 bg-success/10 text-success'
                  : 'border-danger/30 bg-danger/10 text-danger',
              )}
            >
              {message}
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
    </section>
  );
}
