import { AppIcon } from '@/lib/icon-map';
import { AnimatePresence, motion } from 'framer-motion';

interface FieldErrorProps {
  message?: string;
  id?: string;
}

/**
 * Único responsable de mostrar el error de un campo.
 * Mantiene su propio AnimatePresence para que la animación de salida funcione.
 */
export function FieldError({ message, id }: FieldErrorProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key="error"
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-danger flex items-center gap-1 text-xs leading-relaxed"
        >
          <AppIcon category="ui" name="alert" className="text-2xl" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default FieldError;
