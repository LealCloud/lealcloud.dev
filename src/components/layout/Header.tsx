'use client';
import { HEADER_LINKS, NavLink } from '@/config/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { TiThMenu } from 'react-icons/ti';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative">
      <nav
        aria-label="Navegación principal"
        className="bg-surface flex min-h-16 min-w-full items-center justify-between px-6 py-3 shadow-sm"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/icon.svg"
            alt="Logo LealCloud"
            className="h-8 w-8 object-contain"
          />
          <span className="text-accent text-lg font-semibold tracking-tight">
            LealCloud
          </span>
        </a>

        {/* Nav horizontal - solo desktop */}
        <ul className="hidden items-center gap-8 capitalize md:flex">
          {HEADER_LINKS.map((item: NavLink) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-foreground-muted hover:text-primary text-sm font-medium transition-colors"
              >
                {item.labelKey}
              </a>
            </li>
          ))}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          <ThemeToggle size="sm" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="hover:bg-surface-hover focus-visible:outline-border-focus rounded-lg p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
          >
            <TiThMenu className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-surface border-border absolute top-20 right-6 z-50 w-64 rounded-2xl border p-4 shadow-xl md:hidden"
            >
              <div className="border-border/50 mb-3 flex items-center justify-between border-b pb-2">
                <span className="text-foreground-subtle text-xs font-semibold tracking-wider uppercase">
                  Navegación
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-surface-hover rounded-lg p-1.5 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <IoClose className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1 capitalize">
                {HEADER_LINKS.map((item: NavLink) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-surface-hover flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                    >
                      <span>{item.labelKey}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
