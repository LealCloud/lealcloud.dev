import { ComponentProps } from 'react';

type FlagProps = ComponentProps<'svg'>;

/**
 * Bandera de España (ES) - Representa el idioma Español
 * Optimizada en ratio 4:3 con colores oficiales
 */
export function SpainFlag({ className, ...props }: FlagProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      className={className}
      {...props}
    >
      <path fill="#c60b1e" d="M0 0h640v120H0zm0 360h640v120H0z" />
      <path fill="#fabd00" d="M0 120h640v240H0z" />
      {/* Escudo de armas simplificado para rendimiento y nitidez en tamaños pequeños */}
      <path
        fill="#c60b1e"
        d="M120 180h40v80h-40zm80 0h40v80h-40zM140 280c0 33.1 26.9 60 60 60s60-26.9 60-60v-20H140z"
      />
      <circle cx="200" cy="150" r="20" fill="#fabd00" />
    </svg>
  );
}

/**
 * Bandera de Estados Unidos (US) - Representa el idioma Inglés
 * Optimizada en ratio 4:3 con geometría de estrellas limpia
 */
export function UsaFlag({ className, ...props }: FlagProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      className={className}
      {...props}
    >
      <path fill="#bd3d44" d="M0 0h640v480H0z" />
      <path
        fill="#fff"
        d="M0 36.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.9h640v36.9H0zm0 73.8h640v36.9H0z"
      />
      <path fill="#192f5d" d="M0 0h256v258.5H0z" />
      <g fill="#fff">
        <g id="s18">
          <g id="s9">
            <g id="s5">
              <path
                id="s"
                d="M30 13l2.4 7.6h8L34 25.2l2.4 7.6-6.4-4.7-6.4 4.7 2.4-7.6-6.4-4.6h8z"
              />
              <use href="#s" x="60" />
              <use href="#s" x="120" />
              <use href="#s" x="180" />
            </g>
            <use href="#s" x="240" />
            <use href="#s" x="30" y="21.5" />
            <use href="#s" x="90" y="21.5" />
            <use href="#s" x="150" y="21.5" />
            <use href="#s" x="210" y="21.5" />
          </g>
          <use href="#s9" y="43" />
        </g>
        <use href="#s18" y="86" />
        <use href="#s9" y="172" />
      </g>
    </svg>
  );
}
