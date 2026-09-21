// components/ui/Card.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { Button } from './Button';
import type { CustomLinkProps } from './CustomLink';

interface CardProps {
  /** Contenido de la zona superior: imagen, mockup interactivo, lo que sea */
  media: ReactNode;
  category: string;
  title: string;
  description: string;
  tags?: string[];
  href?: CustomLinkProps['href'];
  linkLabel?: string;
  isActive?: boolean;
  className?: string;
}

export function Card({
  media,
  category,
  title,
  description,
  tags = [],
  href,
  linkLabel = 'Ver más',
  isActive = true,
  className = '',
}: CardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      className={`relative flex h-140 flex-col overflow-hidden rounded-3xl border ${
        isActive
          ? 'border-primary/45 bg-surface shadow-[0_0_70px_color-mix(in_oklab,var(--primary)_10%,transparent)]'
          : 'border-border bg-surface/70 opacity-45'
      } ${className}`}
      animate={{ opacity: isActive ? 1 : 0.45, scale: isActive ? 1 : 0.94 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {/* Zona superior: altura fija por aspect ratio, no depende del contenido */}
      <div className="border-border/70 relative aspect-16/7 shrink-0 overflow-hidden border-b bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_55%)]">
        <div className="absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--foreground)_4%,transparent)_1px,transparent_1px)] bg-size-[28px_28px]" />
        <div className="relative flex h-full items-center justify-center p-6 md:p-8">
          {media}
        </div>
      </div>

      {/* Contenido: min-h-0 permite que se encoja al espacio restante del card */}
      <div className="flex min-h-0 flex-1 flex-col p-5 md:p-6">
        <p className="text-primary mb-1.5 shrink-0 text-[10px] font-semibold tracking-[0.14em] uppercase">
          {category}
        </p>

        <h3 className="line-clamp-2 shrink-0 text-xl md:text-2xl">{title}</h3>

        {/* La descripción toma el espacio sobrante y hace scroll interno si es larga */}
        <p className="text-foreground-muted mt-2 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed">
          {description}
        </p>

        {/* Bloque final: shrink-0 evita que tags y botón se compriman o se oculten */}
        <div className="mt-3 flex shrink-0 flex-col gap-3">
          {tags.length > 0 && (
            <ul className="flex max-h-8 shrink-0 flex-wrap gap-1.5 overflow-hidden">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="border-border bg-background/50 text-foreground-subtle rounded-full border px-2.5 py-1 text-xs font-medium"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {isActive && href && (
            <Button
              href={href}
              variant="primary"
              size="sm"
              icon="anglesRight"
              iconPosition="right"
            >
              {linkLabel}
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
