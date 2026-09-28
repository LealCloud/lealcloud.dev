'use client';

import { Button } from '@/components/ui/Button';
import { AppIcon } from '@/lib/icon-map';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export const SUCCESS_TITLE_ID = 'contact-success-title';

const SUCCESS_MESSAGE =
  'Tu mensaje se envió correctamente. Te responderé pronto.';

interface ContactSuccessProps {
  onSendAnother: () => void;
}

/**
 * Responsable de la vista de éxito: contenido, animación y foco accesible.
 */
export default function ContactSuccess({ onSendAnother }: ContactSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <motion.div
      role="status"
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
        id={SUCCESS_TITLE_ID}
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
        onClick={onSendAnother}
      >
        Enviar otro mensaje
      </Button>
    </motion.div>
  );
}
