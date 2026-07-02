'use client';

import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import type { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import esLabels from 'react-phone-number-input/locale/es.json';
import enLabels from 'react-phone-number-input/locale/en.json';

interface ContactPhoneInputProps {
  locale: string;
  labelContactNumber: string;
  labelCountryCode: string;
  labelOptional: string;
  placeholderPhone: string;
  className?: string;
}

export default function ContactPhoneInput({
  locale,
  labelContactNumber,
  labelCountryCode,
  labelOptional,
  placeholderPhone,
  className,
}: ContactPhoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<Value | undefined>(undefined);

  // Normalizamos por si next-intl usa locales regionales (es-CO, en-US, etc.)
  const baseLocale = locale.split('-')[0];
  const countryLabels = baseLocale === 'es' ? esLabels : enLabels;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="contactNumber-input"
        className="text-foreground text-sm font-medium"
      >
        {labelContactNumber}
        <span className="text-muted-foreground/60 ml-1 text-xs">
          ({labelOptional})
        </span>
      </label>

      <input type="hidden" name="contactNumber" value={phoneNumber || ''} />

      <PhoneInput
        id="contactNumber-input"
        international
        countryCallingCodeEditable={false}
        defaultCountry="CO"
        placeholder={placeholderPhone}
        value={phoneNumber}
        onChange={setPhoneNumber}
        labels={countryLabels}
        className={className}
        countrySelectProps={{ 'aria-label': labelCountryCode }}
      />
    </div>
  );
}
