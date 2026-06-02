'use client';

import Link from 'next/link';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { NAVIGATION_MAP, type InternalHref } from '@/config/navigation';
import { cn } from '@/utilities/cn';

/**
 * @fileoverview Componente de navegación polimórfico e inteligente.
 * Discrimina de forma automática entre redirecciones externas mediante la etiqueta `<a>` nativa
 * y enrutamiento interno optimizado a través del componente `<Link>` de Next.js.
 * @module Components/UI/CustomLink
 */

type AllowedHref = InternalHref | `http${string}` | (string & {});

export interface CustomLinkProps extends Omit<
  ComponentPropsWithoutRef<'a'>,
  'href'
> {
  href: AllowedHref;
  label?: string;
}

/**
 * @component CustomLink
 * @description Componente con soporte de referencias (ForwardRef) y accesibilidad automatizada.
 * Inyecta atributos de seguridad y aria-labels contextuales evaluando la estructura de sus hijos.
 */
export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, label, className, children, ...props }, ref) => {
    const foundRoute = NAVIGATION_MAP.find((route) => route.href === href);
    const resolvedLabel = label ?? foundRoute?.label;
    const renderContent = children ?? resolvedLabel ?? href;

    const isChildrenText = typeof children === 'string';
    const automaticAriaLabel =
      children && !isChildrenText ? resolvedLabel : undefined;

    const isExternal =
      typeof href === 'string' &&
      (/^https?:\/\//.test(href) || href.startsWith('//'));

    const commonClasses = cn('cursor-pointer', className);
    const finalAriaLabel = props['aria-label'] ?? automaticAriaLabel;

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={commonClasses}
          {...props}
          aria-label={finalAriaLabel}
        >
          {renderContent}
        </a>
      );
    }

    return (
      <Link
        ref={ref}
        href={href as any}
        className={commonClasses}
        {...props}
        aria-label={finalAriaLabel}
      >
        {renderContent}
      </Link>
    );
  },
);

CustomLink.displayName = 'CustomLink';
