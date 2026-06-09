'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { CustomLink, type CustomLinkProps } from '../Link';
import { IconMap, type UiIconName, type SocialIconName } from '@/lib/iconMap';
import { cn } from '@/utilities/cn';

// ==========================================
// 1. TIPADOS Y LOGICA DE CONTROL (TYPESCRIPT)
// ==========================================

export type CommonButtonVariant = 'primary' | 'secondary';
export type SocialButtonVariant = 'social';
export type ButtonVariant = CommonButtonVariant | SocialButtonVariant;

interface WithTextContent {
  children: React.ReactNode;
  'aria-label'?: string;
}

interface OnlyIconContent {
  children?: never;
  'aria-label': string; // Obligatorio por accesibilidad si no hay texto
}

type ButtonContentProps = WithTextContent | OnlyIconContent;

interface BaseProps {
  fullWidth?: boolean;
  className?: string;
  iconPosition?: 'left' | 'right';
}

interface CommonIconProps {
  variant: CommonButtonVariant;
  icon?: UiIconName;
}

interface SocialIconProps {
  variant: SocialButtonVariant;
  icon?: SocialIconName;
}

type VariantAndIconProps = CommonIconProps | SocialIconProps;

type ButtonAsLink = BaseProps &
  VariantAndIconProps &
  ButtonContentProps &
  Omit<CustomLinkProps, 'variant' | 'icon' | 'children' | 'aria-label'>;

type ButtonAsButton = BaseProps &
  VariantAndIconProps &
  ButtonContentProps &
  Omit<
    ComponentPropsWithoutRef<'button'>,
    'variant' | 'children' | 'aria-label'
  > & {
    href?: never; // Evita que se pase un href a un botón nativo
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

// ==========================================
// 2. COMPONENTE PRINCIPAL (LOGICA Y RENDER)
// ==========================================

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    variant,
    icon,
    iconPosition = 'left',
    fullWidth = false, // Corregido: booleano real nativo
    className,
    children,
    ...restProps
  } = props;

  // Guarda lógica: Discriminamos si debe actuar como enlace evaluando las propiedades restantes
  const isLink = 'href' in restProps;

  // Lógica de Negocio: Resolución dinámica del Icono desde el mapa importado
  const IconComponent = (() => {
    if (!icon) return null;

    if (variant === 'social') {
      return IconMap.social[icon as SocialIconName];
    }

    // Aquí TS sabe que la variante es 'primary' o 'secondary', por ende es UiIconName
    return IconMap.ui[icon as UiIconName];
  })();

  // Lógica de Renderizado de Hijos: Inyección posicional de iconos respecto al texto
  const buttonContent = (
    <>
      {IconComponent && iconPosition === 'left' && <IconComponent />}
      {children}
      {IconComponent && iconPosition === 'right' && <IconComponent />}
    </>
  );

  // Unificación de Clases Lógicas (Aquí es donde agregas tus clases base de diseño)
  const finalClasses = cn(
    'inline-flex items-center justify-center transition-colors select-none', // Ejemplo de base lógica
    fullWidth && 'w-full',
    className,
  );

  // RENDER CONDICIONAL INTELIGENTE

  if (isLink) {
    // Forzamos a TypeScript a tratar las propiedades restantes bajo el contrato de CustomLink
    const linkProps = restProps as Omit<CustomLinkProps, 'children'>;

    return (
      <CustomLink
        ref={ref as React.Ref<HTMLAnchorElement>} // Type casting seguro de la referencia polimórfica
        className={finalClasses}
        {...linkProps}
      >
        {buttonContent}
      </CustomLink>
    );
  }

  // Por descarte estricto, si no es link, opera como un botón nativo de HTML
  const buttonProps = restProps as ComponentPropsWithoutRef<'button'>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>} // Type casting seguro de la referencia polimórfica
      className={finalClasses}
      {...buttonProps}
    >
      {buttonContent}
    </button>
  );
});

Button.displayName = 'Button';
