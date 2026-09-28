import { cn } from '@/utilities/cn';
import {
  ChangeEvent,
  cloneElement,
  FocusEvent,
  forwardRef,
  isValidElement,
  ReactNode,
  type Ref,
} from 'react';
import { FieldError } from './FieldError';

type FieldSize = 'sm' | 'md' | 'lg';
type FieldVariant = 'default' | 'filled' | 'outlined';

export interface InputFieldProps {
  label: string;
  name?: string;
  type?: string;
  value?: string | number | boolean | null;
  defaultValue?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  onBlur?: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  icon?: ReactNode;
  rightElement?: ReactNode;
  isSelect?: boolean;
  multiline?: boolean;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
  error?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  size?: FieldSize;
  variant?: FieldVariant;
  id?: string;
}

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/* ====================================================
   Estilos (constantes: no se recrean en cada render)
   ==================================================== */

const SIZE_CLASSES: Record<FieldSize, { base: string; minH: string }> = {
  sm: { base: 'text-xs px-2.5 gap-2', minH: 'min-h-9' },
  md: { base: 'text-sm px-3.5 gap-3', minH: 'min-h-11' },
  lg: { base: 'text-base px-4 gap-3.5', minH: 'min-h-12' },
};

const VARIANT_CLASSES: Record<FieldVariant, string> = {
  default: cn(
    'border-border bg-surface/60 text-foreground-muted',
    'hover:border-primary/50 hover:bg-surface-hover hover:text-primary',
    'focus-within:border-primary/70 focus-within:bg-surface-hover focus-within:text-primary',
  ),
  filled: cn(
    'border-transparent bg-surface-hover text-foreground-muted',
    'hover:bg-surface-active hover:text-primary',
    'focus-within:bg-surface-active focus-within:text-primary focus-within:border-primary/70',
  ),
  outlined: cn(
    'border-2 border-border bg-transparent text-foreground-muted',
    'hover:border-primary/50 hover:text-primary',
    'focus-within:border-primary focus-within:text-primary',
  ),
};

const ICON_SIZES: Record<FieldSize, number> = { sm: 16, md: 18, lg: 20 };

const SELECT_OPTION_CLASSES = cn(
  'bg-surface text-foreground',
  'hover:bg-primary/10',
  'focus:bg-primary/20',
);

/* ====================================================
   Sub-componentes de presentación
   ==================================================== */

interface IconProps {
  size?: number;
  className?: string;
}

interface RightElementProps {
  className?: string;
}

function FieldIcon({ icon, size }: { icon: ReactNode; size: FieldSize }) {
  if (!icon) return null;

  if (isValidElement<IconProps>(icon)) {
    return (
      <span className={cn('shrink-0', icon.props.className)}>
        {cloneElement(icon, { size: ICON_SIZES[size] } as Partial<IconProps>)}
      </span>
    );
  }

  return <span className="shrink-0">{icon}</span>;
}

function FieldRightElement({ element }: { element: ReactNode }) {
  if (!element) return null;

  if (isValidElement<RightElementProps>(element)) {
    const isCustomComponent =
      typeof element.type === 'function' ||
      (typeof element.type === 'object' && element.type !== null);

    if (isCustomComponent) {
      return cloneElement(element, {
        className: cn(
          'text-foreground-muted hover:text-primary',
          'grid cursor-pointer place-items-center',
          'border-0 bg-transparent p-1 transition-colors',
          element.props.className,
        ),
      } as Partial<RightElementProps>);
    }
  }

  return <span className="shrink-0">{element}</span>;
}

/* ====================================================
   Componente principal
   Responsable de: label + contenedor + control + error.
   ==================================================== */

export const InputField = forwardRef<FieldElement, InputFieldProps>(
  function InputField(
    {
      label,
      name,
      id,
      type = 'text',
      value,
      defaultValue,
      onChange,
      onBlur,
      placeholder,
      autoComplete,
      required = true,
      icon,
      rightElement,
      isSelect = false,
      multiline = false,
      rows = 4,
      options = [],
      error,
      disabled = false,
      className = '',
      containerClassName = '',
      size = 'md',
      variant = 'default',
    },
    ref,
  ) {
    const fieldId = id || name;
    const errorId = fieldId ? `${fieldId}-error` : undefined;

    // Controlado si el padre pasa `value` explícitamente; si no (p. ej. con
    // register() de react-hook-form, que no incluye `value`), queda como
    // no controlado y usa `defaultValue`.
    const isControlled = value !== undefined;
    const controlledProps = isControlled
      ? { value: value === null ? '' : String(value) }
      : { defaultValue };

    const controlClasses = cn(
      'text-foreground',
      'placeholder:text-foreground-subtle/60',
      'w-full min-w-0 border-0 bg-transparent p-0 m-0 outline-0',
      disabled && 'cursor-not-allowed text-disabled-text',
      className,
    );

    const containerClasses = cn(
      'flex rounded-xl border shadow-sm',
      multiline ? 'items-start py-2.5' : 'items-center',
      'transition-all duration-200',
      'focus-within:-translate-y-0.5 focus-within:shadow-md',
      'hover:-translate-y-0.5',
      SIZE_CLASSES[size].base,
      !multiline && SIZE_CLASSES[size].minH,
      VARIANT_CLASSES[variant],
      error &&
        'border-danger/50 focus-within:border-danger focus-within:shadow-danger/20',
      disabled &&
        'cursor-not-allowed border-border bg-disabled text-disabled-text opacity-100 hover:translate-y-0 hover:shadow-none',
      containerClassName,
    );

    const sharedFieldProps = {
      id: fieldId,
      name,
      onChange,
      onBlur,
      placeholder,
      disabled,
      className: controlClasses,
      'aria-invalid': !!error,
      'aria-required': required,
      // Solo se referencia el error cuando existe en el DOM.
      'aria-describedby': error ? errorId : undefined,
      ...controlledProps,
    };

    return (
      <div className="grid gap-1.5">
        <label htmlFor={fieldId} className="group grid gap-1.5">
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              disabled
                ? 'text-disabled-text'
                : 'text-foreground-muted group-focus-within:text-primary',
            )}
          >
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </span>
          <div className={containerClasses}>
            <FieldIcon icon={icon} size={size} />

            {multiline ? (
              <textarea
                ref={ref as Ref<HTMLTextAreaElement>}
                rows={rows}
                autoComplete={autoComplete}
                required={required}
                {...sharedFieldProps}
              />
            ) : isSelect ? (
              <select
                ref={ref as Ref<HTMLSelectElement>}
                required={required}
                {...sharedFieldProps}
              >
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className={SELECT_OPTION_CLASSES}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                ref={ref as Ref<HTMLInputElement>}
                type={type}
                autoComplete={autoComplete}
                required={required}
                {...sharedFieldProps}
              />
            )}

            <FieldRightElement element={rightElement} />
          </div>
        </label>

        <FieldError id={errorId} message={error} />
      </div>
    );
  },
);

export default InputField;
