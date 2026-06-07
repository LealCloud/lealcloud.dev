'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, routing, usePathname, type AppLocale } from '@/navigation';
import { SpainFlag, UsaFlag } from './flags';
import { cn } from '@/utilities/cn';

type FlagComponent = ComponentType<{
  className?: string;
  'aria-hidden'?: boolean;
}>;

const LOCALE_FLAGS: Record<AppLocale, FlagComponent> = {
  es: SpainFlag,
  en: UsaFlag,
};

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * Selector de idioma con navegación client-side vía next-intl.
 * Preserva la ruta actual (incluyendo segmentos dinámicos) al cambiar de locale.
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations('layout.languageSwitcher');
  const currentLocale = useLocale() as AppLocale;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const locales = routing.locales as readonly AppLocale[];
  const CurrentFlag = LOCALE_FLAGS[currentLocale];
  const currentLanguage = t(`locales.${currentLocale}`);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen, close]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(true);
        break;
      case 'Escape':
        close();
        break;
    }
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const options = Array.from(
      event.currentTarget.querySelectorAll<HTMLAnchorElement>(
        '[role="option"]',
      ),
    );
    const activeIndex = options.findIndex(
      (option) => option === document.activeElement,
    );

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        triggerRef.current?.focus();
        break;
      case 'ArrowDown': {
        event.preventDefault();
        const next = activeIndex < options.length - 1 ? activeIndex + 1 : 0;
        options[next]?.focus();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prev = activeIndex > 0 ? activeIndex - 1 : options.length - 1;
        options[prev]?.focus();
        break;
      }
      case 'Tab':
        close();
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        ref={triggerRef}
        type="button"
        id={`${listboxId}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={t('triggerAriaLabel', { language: currentLanguage })}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          'inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-full px-2',
          'text-foreground/80 hover:bg-foreground/10 hover:text-foreground',
          'focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 focus-visible:outline-none',
          'transition-all duration-200 ease-out active:scale-95',
          'md:gap-2 md:px-2.5',
          isOpen && 'bg-foreground/10 text-foreground',
        )}
      >
        <span className="ring-foreground/10 relative flex h-3.5 w-[1.125rem] shrink-0 overflow-hidden rounded-sm ring-1">
          <CurrentFlag className="h-full w-full object-cover" aria-hidden />
        </span>
        <span className="hidden text-[10px] font-bold tracking-widest uppercase sm:inline">
          {currentLocale}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className={cn(
            'text-foreground/60 size-3 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ul
        id={listboxId}
        role="listbox"
        aria-labelledby={`${listboxId}-trigger`}
        aria-label={t('listAriaLabel')}
        tabIndex={-1}
        onKeyDown={handleListKeyDown}
        className={cn(
          // Estilos base y posicionamiento (común para desktop y móvil)
          'absolute top-[calc(100%+0.5rem)] right-0 z-[60] min-w-[11.5rem] origin-top-right p-1',
          'rounded-2xl border backdrop-blur-md',
          'border-[var(--nav-border)] bg-[var(--nav-bg)]',
          'shadow-[0_8px_32px_-4px_var(--lamp-shadow),0_2px_8px_-2px_oklch(0_0_0/0.10)]',
          'transition-all duration-200 ease-out',

          // Estados de animación consistentes
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0',

          // Ajustes específicos para Mobile (evitamos el fixed conflictivo)
          'max-md:right-0 max-md:left-auto max-md:w-48',
        )}
      >
        {locales.map((locale) => {
          const Flag = LOCALE_FLAGS[locale];
          const label = t(`locales.${locale}`);
          const isSelected = locale === currentLocale;

          return (
            <li key={locale} role="presentation">
              <Link
                href={pathname}
                locale={locale}
                role="option"
                aria-selected={isSelected}
                aria-label={t('switchTo', { language: label })}
                tabIndex={isOpen ? 0 : -1}
                onClick={close}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5',
                  'text-sm font-medium transition-all duration-150 ease-out',
                  'focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 focus-visible:outline-none',
                  isSelected
                    ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                    : 'text-foreground/80 hover:bg-foreground/10 hover:text-foreground active:scale-[0.98]',
                )}
              >
                <span className="ring-foreground/10 relative flex h-4 w-[1.375rem] shrink-0 overflow-hidden rounded-sm ring-1">
                  <Flag className="h-full w-full object-cover" aria-hidden />
                </span>
                <span className="flex-1">{label}</span>
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  {locale}
                </span>
                {isSelected && (
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
