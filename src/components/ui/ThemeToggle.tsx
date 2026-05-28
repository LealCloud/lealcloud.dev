'use client';

import { useEffect, useState } from 'react';
import { IconMap } from '@/lib/iconMap';
import { useTheme } from '@/providers/Theme';

/**
 * @fileoverview Componente atómico responsivo para alternancia dinámica de tema visual (ThemeToggle).
 * Calcula proporciones matemáticas adaptativas basadas en un tamaño semilla en píxeles.
 * Cumple con los estándares de accesibilidad WCAG y mitiga parpadeos de hidratación.
 * @module Components/UI/ThemeToggle
 */

interface ThemeToggleProps {
  /** Clases de utilidad CSS adicionales (Tailwind) para el posicionamiento o layouts externos. */
  className?: string;
  /** * Dimensión de altura base en píxeles que orquesta la escala proporcional de todo el switch.
   * @default 36 (Equivalente al token utilitario h-9 de Tailwind)
   */
  size?: number;
}

/**
 * Switch interactivo adaptativo para el control cromático global del ecosistema.
 */
export default function ThemeToggle({
  className = '',
  size = 36,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Sincroniza el ciclo de vida para autorizar el renderizado del cliente post-hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme || 'dark';
  const isDark = currentTheme === 'dark';
  const Icon = IconMap.ui[currentTheme];

  // ─── Proporciones Matemáticas del Sistema de Diseño (Base: Escala Original de 36px) ───
  const ratio = size / 36;
  const height = size;
  const width = size * 2; // Relación estricta de aspecto 1:2 (ej. h-9 w-18)
  const thumbSize = size * (28 / 36); // Escalado relativo del deslizador móvil (Thumb)
  const thumbOffset = size * (4 / 36); // Separación interna proporcional (Padding equivalente)
  const thumbTravel = size * (36 / 36); // Distancia del vector de traslación cinemática
  const iconSize = Math.round(size * (16 / 36)); // Dimensión final del glifo vectorial encapsulado

  const style = {
    height,
    width,
    borderRadius: height / 2,
    padding: 0,
  } as React.CSSProperties;

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    top: thumbOffset,
    left: thumbOffset,
    borderRadius: '50%',
    transform: isDark ? `translateX(${thumbTravel}px)` : 'translateX(0)',
    transition: 'transform 300ms cubic-bezier(0.17, 0.67, 0.83, 0.67)',
  } as React.CSSProperties;

  // Estado de Reserva Estructural (Skeleton Loader): Asegura consistencia dimensional exacta previa a hidratación
  if (!mounted) {
    return (
      <div
        className={`bg-background/15 self-center justify-self-center ${className}`}
        style={style}
      />
    );
  }

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Alternar tema"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`bg-foreground relative flex cursor-pointer items-center self-center justify-self-center shadow-xs outline-hidden transition-colors duration-400 ease-in-out ${className}`}
      style={style}
    >
      {/* Contenedor Cinético Deslizante (Thumb) */}
      <span
        className="bg-background absolute flex items-center justify-center shadow-md"
        style={thumbStyle}
      >
        <Icon
          size={iconSize}
          className="text-foreground transition-colors duration-300"
        />
      </span>
    </button>
  );
}
