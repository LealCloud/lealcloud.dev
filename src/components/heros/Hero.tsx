import Image from 'next/image';
import Link from 'next/link';
import { IconMap } from '@/lib/iconMap';

/**
 * @fileoverview Componente estructural de la sección Hero para lealcloud.dev.
 * Diseñado bajo un esquema de dos columnas adaptativas, micro-bento semántico de métricas
 * y navegación social tipada de forma estricta a partir del registro maestro de iconos.
 * @module Components/Sections/Hero
 */

/* ─────────────────────────────────────────────────
   CONTENIDO ESTÁTICO & ESPECIFICACIONES
───────────────────────────────────────────────── */

const CONTENT = {
  badge: 'Disponible para trabajar' as string | undefined,
  name: 'Steven Leal T.',
  role: 'Software Engineer & Architect',
  description: (
    <>
      Estudiante de{' '}
      <strong>analista y desarrollador de software colombiano 🇨🇴</strong>.
      Especializado en desarrollo web de alto rendimiento: arquitecturas
      escalables, código limpio y entregas orientadas a negocio.
    </>
  ),
};

const STATS = [
  { label: '01. STACK', value: 'React / Next.js' },
  { label: '02. FOCUS', value: 'Cloud Architecture' },
  { label: '03. STATUS', value: 'Open for Collab' },
  { label: '04. LOC', value: 'Colombia 🇨🇴' },
] as const;

/* ─────────────────────────────────────────────────
   NAVEGACIÓN SOCIAL Y CONFIGURACIÓN DE ICONOS
───────────────────────────────────────────────── */

type SocialIconName = (typeof SOCIAL)[number]['icon'];

const SOCIAL = [
  { name: 'contact', url: '/contact', icon: 'email', variant: 'primary' },
  {
    name: 'github',
    url: 'https://github.com/LealCloud',
    icon: 'github',
    variant: 'glass',
  },
  {
    name: 'linkedin',
    url: 'https://linkedin.com/in/lealcloud/',
    icon: 'linkedin',
    variant: 'glass',
  },
] as const;

const PROFILE_PHOTO = {
  src: '/profilePhoto.webp',
  alt: `${CONTENT.name} — Analista y Desarrollador de Software colombiano.`,
};

/* ─────────────────────────────────────────────────
   SUB-COMPONENTES ATÓMICOS
───────────────────────────────────────────────── */
// TODO (Refactor): Migrar este elemento hacia un componente unificado <Button />
// polimórfico (utilizando la propiedad 'as' para alternar entre <a>, <button> o <Link>).
interface ButtonSocialProps {
  url: string;
  label: string;
  iconName: SocialIconName;
  variant: 'primary' | 'glass';
}

/**
 * @component ButtonSocial
 * @description Enlace interactivo con tipado fuerte enfocado en redirecciones de contacto.
 * - `primary`: Botón de estado sólido con sombra difusa para capturar la interacción principal (CTA).
 * - `glass`: Botón translúcido acoplado al utilitario nativo v4 `glass-card`.
 */
const ButtonSocial = ({ url, label, iconName, variant }: ButtonSocialProps) => {
  const Icon = IconMap.social[iconName];
  const isExternal = url.startsWith('http');

  const baseClasses =
    'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95';

  const variantClasses =
    variant === 'primary'
      ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:brightness-110'
      : 'glass-card text-foreground hover:bg-surface-variant';

  return (
    <Link
      href={url}
      target={isExternal ? '_blank' : '_self'}
      {...(isExternal && { rel: 'noopener noreferrer' })}
      aria-label={`Perfil de ${label} de ${CONTENT.name}`}
      className={`${baseClasses} ${variantClasses}`}
    >
      {Icon && <Icon className="size-4" />}
      <span className="capitalize">{label}</span>
    </Link>
  );
};

/* ─────────────────────────────────────────────────
   COMPONENTE ORQUESTADOR PRINCIPAL
───────────────────────────────────────────────── */

/**
 * @component Hero
 * @description Sección de impacto inicial (Viewport superior). Implementa animaciones
 * cronometradas mediante aceleración por hardware (`will-change-transform`), ring reactivo
 * al hover del mouse y marcado de accesibilidad estricto (WAI-ARIA).
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-screen flex-col items-center justify-center gap-12 overflow-hidden px-6 pt-24 lg:flex-row lg:items-center lg:px-16"
    >
      {/* ── Columna de Contenido Escrito ── */}
      <div className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:col-span-7 lg:max-w-[55%] lg:items-start lg:text-left">
        {/* Badge de Disponibilidad Laboral Animado 
        TODO: Extraer a un componente atómico reutilizable `<Badge />*/}

        {CONTENT.badge && (
          <div className="border-accent/40 relative inline-flex items-center justify-center overflow-hidden rounded-full border p-[1px] select-none">
            <span
              aria-hidden
              className="absolute inset-0 h-full w-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,var(--color-accent)_50%,#ffffff_90%,transparent_100%)] opacity-50 will-change-transform"
            />
            <span className="text-accent bg-background/40 relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium backdrop-blur-md">
              <span
                aria-hidden
                className="relative flex size-2.5 items-center justify-center"
              >
                <span className="bg-accent absolute inline-flex size-full animate-[ping_2s_cubic-bezier(0.25,0,0,1)_infinite] rounded-full opacity-75" />
                <span className="bg-accent relative inline-flex size-2.5 rounded-full" />
              </span>
              {CONTENT.badge}
            </span>
          </div>
        )}

        {/* Encabezado Principal Semántico */}
        <div className="flex w-full flex-col items-center gap-0.5 lg:items-start">
          <h1
            id="hero-title"
            className="text-accent text-center text-4xl leading-none font-black sm:text-5xl lg:text-left lg:text-6xl"
          >
            {CONTENT.name}
          </h1>
          <h2 className="text-muted-foreground text-center text-xs font-medium tracking-wider uppercase sm:text-sm lg:text-left lg:text-base">
            {CONTENT.role}
          </h2>
        </div>
        {/* Descripción */}
        <p className="text-muted-foreground/90 max-w-2xl text-center font-sans text-sm leading-relaxed tracking-normal sm:text-base lg:text-left">
          {CONTENT.description}
        </p>

        {/* Barra de Navegación Social */}
        <nav aria-label="Redes sociales y contacto" className="w-full">
          <ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0 lg:justify-start">
            {/* TODO: Migrar la lógica de enrutamiento a un componente aislado y reutilizable.
                Motivo: Seguir las buenas prácticas oficiales de Next.js. Se debe renderizar un elemento 
                `<a>` nativo para URLs externas y el componente `<Link>` de framework exclusivamente para 
                navegación interna, evitando sobrecargar el enrutador del cliente con prefeching innecesario.
            */}
            {SOCIAL.map((network) => (
              <li key={network.name}>
                <ButtonSocial
                  url={network.url}
                  label={network.name}
                  iconName={network.icon}
                  variant={network.variant}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Micro-bento de Datos Técnicos Completos (SEO / Sintaxis Semántica) */}
        <dl className="border-foreground/10 mt-4 grid w-full grid-cols-2 gap-4 border-t pt-6 sm:gap-3 md:grid-cols-4">
          {STATS.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              {/* Término de definición (Label) */}
              <dt className="text-primary font-mono text-xs font-medium tracking-widest uppercase opacity-90 lg:text-[11px]">
                {label}
              </dt>
              {/* Descripción del término (Value) */}
              <dd className="text-foreground balance text-sm font-medium">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Columna de Imagen e Identidad Visual ── */}
      <figure className="group relative order-1 flex justify-center lg:order-2 lg:justify-end">
        {/* Acentos geométricos: líneas en esquinas opuestas */}
        <div
          aria-hidden
          className="border-primary/40 absolute -top-4 -right-4 h-24 w-24 rounded-tr-3xl border-t-2 border-r-2 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
        />
        <div
          aria-hidden
          className="border-secondary/40 absolute -bottom-4 -left-4 h-24 w-24 rounded-bl-3xl border-b-2 border-l-2 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"
        />

        {/* Contenedor Máscara con Transición de Grayscale */}
        <div className="ring-foreground/10 group-hover:ring-primary/50 relative z-10 h-64 w-64 overflow-hidden rounded-2xl shadow-2xl ring-1 transition-all duration-500 md:h-80 md:w-80 lg:h-[400px] lg:w-[400px]">
          <Image
            src={PROFILE_PHOTO.src}
            alt={PROFILE_PHOTO.alt}
            width={400}
            height={400}
            priority
            className="h-full w-full scale-105 object-cover grayscale transition-all duration-700 hover:scale-100 hover:grayscale-0"
          />
          <div
            aria-hidden
            className="from-background/60 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
        </div>

        {/* Tag Flotante Interactivo */}
        <div className="glass-card border-primary/20 absolute -right-8 bottom-6 z-20 animate-bounce rounded-lg border p-2 shadow-xl hover:animate-none">
          <div className="flex items-center gap-2">
            {/* TODO: Integrar icono al IconMap y consumirlo */}
            <svg
              aria-hidden
              className="text-primary size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
            <span className="text-foreground font-mono text-xs">
              Software_Eng.exe
            </span>
          </div>
        </div>
      </figure>
    </section>
  );
}
