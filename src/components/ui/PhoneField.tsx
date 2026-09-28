'use client';

import { cn } from '@/utilities/cn';
import type { ComponentProps } from 'react';
import PhoneInput, { type Country } from 'react-phone-number-input';
import esLabels from 'react-phone-number-input/locale/es.json';
import 'react-phone-number-input/style.css';
import { FieldError } from './FieldError';

export interface PhoneFieldProps {
  label: string;
  id: string;
  name?: string;
  value?: string;
  onChange: (value?: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultCountry?: Country;
  ref?: ComponentProps<typeof PhoneInput>['ref'];
}

const containerClasses = cn(
  'flex min-h-11 items-center gap-3 rounded-xl border border-border bg-surface/60 px-3.5 text-sm',
  'transition-all duration-200',
  'hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-hover',
  'focus-within:-translate-y-0.5 focus-within:border-primary/70 focus-within:bg-surface-hover focus-within:shadow-md',
  '[&_.PhoneInputCountry]:mr-1 [&_.PhoneInputCountrySelect]:bg-transparent',
  // El popup nativo del select no hereda la transparencia: fondo y texto explícitos.
  '[&_.PhoneInputCountrySelect_option]:bg-surface [&_.PhoneInputCountrySelect_option]:text-foreground',
  '[&_.PhoneInputCountrySelectArrow]:opacity-60',
);

const inputClasses = cn(
  'min-w-0 flex-1 border-0 bg-transparent p-0 m-0 text-foreground',
  'placeholder:text-foreground-subtle/60 outline-0',
);

/**
 * Responsable de: label + input de teléfono + error, con estilos coherentes
 * con InputField. No conoce react-hook-form; recibe value/onChange por props.
 */
export function PhoneField({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  placeholder = 'Ej. 300 123 4567',
  defaultCountry = 'CO',
  ref,
}: PhoneFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-1.5">
      <div className="group grid gap-1.5">
        <label
          htmlFor={id}
          className="text-foreground-muted group-focus-within:text-primary text-sm font-medium transition-colors"
        >
          {label}
        </label>
        <PhoneInput
          international
          defaultCountry={defaultCountry}
          labels={esLabels}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          ref={ref}
          className={cn(
            containerClasses,
            error && 'border-danger/50 focus-within:border-danger',
          )}
          numberInputProps={{
            id,
            className: inputClasses,
            'aria-invalid': !!error,
            'aria-describedby': error ? errorId : undefined,
          }}
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default PhoneField;
