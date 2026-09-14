import { AppIcon } from '@/lib/icon-map';
import { cn } from '@/utilities/cn';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChangeEvent,
  cloneElement,
  FocusEvent,
  forwardRef,
  isValidElement,
  ReactNode,
} from 'react';

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
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  id?: string;
}

interface IconProps {
  size?: number;
  className?: string;
}

interface RightElementProps {
  className?: string;
}

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

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
    const sizeClasses = {
      sm: { base: 'text-xs px-2.5 gap-2', minH: 'min-h-9' },
      md: { base: 'text-sm px-3.5 gap-3', minH: 'min-h-11' },
      lg: { base: 'text-base px-4 gap-3.5', minH: 'min-h-12' },
    };

    const variantClasses = {
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

    const iconSizeMap = { sm: 16, md: 18, lg: 20 };

    const fieldId = id || name;

    // Controlado si el padre pasa `value` explícitamente; si no (p. ej. con
    // register() de react-hook-form, que no incluye `value`), queda como
    // no controlado y usa `defaultValue`.
    const isControlled = value !== undefined;
    const controlledProps = isControlled
      ? { value: value === null ? '' : String(value) }
      : { defaultValue };

    const baseInputClasses = cn(
      'text-foreground',
      'placeholder:text-foreground-subtle/60',
      'w-full min-w-0 border-0 bg-transparent p-0 m-0 outline-0',
      disabled && 'cursor-not-allowed text-disabled-text',
      className,
    );

    const baseContainerClasses = cn(
      'flex rounded-xl border shadow-sm',
      multiline ? 'items-start py-2.5' : 'items-center',
      'transition-all duration-200',
      'focus-within:-translate-y-0.5 focus-within:shadow-md',
      'hover:-translate-y-0.5',
      sizeClasses[size].base,
      !multiline && sizeClasses[size].minH,
      variantClasses[variant],
      error &&
        'border-danger/50 focus-within:border-danger focus-within:shadow-danger/20',
      disabled &&
        'cursor-not-allowed border-border bg-disabled text-disabled-text opacity-100 hover:translate-y-0 hover:shadow-none',
      containerClassName,
    );

    const renderIcon = (iconElement: ReactNode) => {
      if (!iconElement) return null;

      if (isValidElement<IconProps>(iconElement)) {
        const existingProps = iconElement.props;
        const iconSize = iconSizeMap[size];

        return (
          <span className={cn('shrink-0', existingProps.className)}>
            {cloneElement(iconElement, {
              size: iconSize,
            } as Partial<IconProps>)}
          </span>
        );
      }

      return <span className="shrink-0">{iconElement}</span>;
    };

    const renderRightElement = (element: ReactNode) => {
      if (!element) return null;

      if (isValidElement<RightElementProps>(element)) {
        const existingProps = element.props;
        const isCustomComponent =
          typeof element.type === 'function' ||
          (typeof element.type === 'object' && element.type !== null);

        if (isCustomComponent) {
          return cloneElement(element, {
            className: cn(
              'text-foreground-muted hover:text-primary',
              'grid cursor-pointer place-items-center',
              'border-0 bg-transparent p-1 transition-colors',
              existingProps.className,
            ),
          } as Partial<RightElementProps>);
        }
      }

      return <span className="shrink-0">{element}</span>;
    };

    const selectOptionClasses = cn(
      'bg-surface text-foreground',
      'hover:bg-primary/10',
      'focus:bg-primary/20',
    );

    const errorId = fieldId ? `${fieldId}-error` : undefined;

    const sharedFieldProps = {
      id: fieldId,
      name,
      onChange,
      onBlur,
      placeholder,
      disabled,
      className: baseInputClasses,
      'aria-invalid': !!error,
      'aria-required': required,
      'aria-describedby': errorId,
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
          <div className={baseContainerClasses}>
            {icon && renderIcon(icon)}

            {multiline ? (
              <textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                rows={rows}
                autoComplete={autoComplete}
                required={required}
                {...sharedFieldProps}
              />
            ) : isSelect ? (
              <select
                ref={ref as React.Ref<HTMLSelectElement>}
                required={required}
                {...sharedFieldProps}
              >
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className={selectOptionClasses}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                type={type}
                autoComplete={autoComplete}
                required={required}
                {...sharedFieldProps}
              />
            )}

            {rightElement && renderRightElement(rightElement)}
          </div>
        </label>
        <AnimatePresence>
          {error && errorId && (
            <motion.p
              key="error"
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-danger flex items-center gap-1 text-xs leading-relaxed"
            >
              <AppIcon category="ui" name="alert" className="text-2xl" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

export default InputField;
