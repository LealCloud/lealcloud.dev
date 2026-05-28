import Image from 'next/image';
import Link from 'next/link';
import { IconMap } from '@/lib/iconMap';

/**
 * @fileoverview Módulo de Presentación Principal (Hero Section).
 * Centraliza el contenido descriptivo del perfil profesional, gestiona el renderizado
 * condicional de disponibilidad laboral e indexa redes de contacto mediante un
 * contrato estricto heredado del sistema modular de iconografía.
 * @module Components/Sections/Hero
 */

// 1. Tipado limpio para el Badge
type BadgeText = string | undefined;

/**
 * @constant CONTENT
 * @description Almacén estático de cadenas de texto de la sección.
 * * DESIGN DECISION: Separar el contenido textual de las etiquetas HTML del componente
 * facilita migraciones futuras hacia un sistema de internacionalización (i18n), archivos JSON
 * externos o un CMS headless (Content Management System).
 */
const CONTENT = {
  badge: 'Disponible para trabajar' as BadgeText,
  name: 'Steven Leal T.',
  description:
    'Analista y desarrollador de software colombiano 🇨🇴. Especializado en desarrollo web de alto rendimiento: arquitecturas escalables, código limpio y entregas orientadas a negocio.',
};

/**
 * @typedef {keyof typeof IconMap.social} SocialIconName
 * @description Firma de tipo exclusiva para el subgrupo de redes. Restringe las cadenas
 * literales permitidas en esta sección únicamente a las claves del objeto `social` en IconMap.
 */
type SocialIconName = (typeof SOCIAL)[number]['icon'];

/**
 * @constant SOCIAL
 * @description Matriz de configuración inmutable para los canales y redes de contacto.
 * * PERFORMANCE NOTE: Mapea las propiedades 'icon' utilizando aserciones de tipo explícitas
 * para alinearse con el contrato estricto de `SocialIconName`, evitando que TypeScript generalice
 * el valor como un string común y corriente.
 */
const SOCIAL = [
  { name: 'contact', url: '/contact', icon: 'email' },
  { name: 'github', url: 'https://github.com/LealCloud', icon: 'github' },
  {
    name: 'linkedin',
    url: 'https://linkedin.com/in/lealcloud/',
    icon: 'linkedin',
  },
] as const;

/**
 * @constant PROFILE_PHOTO
 * @description Metadata y especificaciones de la imagen de identidad del desarrollador.
 */
const PROFILE_PHOTO = {
  src: '/profilePhoto.webp',
  alt: `Foto de perfil de ${CONTENT.name}`,
};

interface BadgeProps {
  children: React.ReactNode;
}

/**
 * @component BadgeTarget
 * @description Componente atómico contenedor para el tag de estado/disponibilidad.
 */
const BadgeTarget = ({ children }: BadgeProps) => {
  return <span>{children}</span>;
};

interface ButtonSocialProps {
  url: string;
  label: string;
  iconName: SocialIconName;
}

/**
 * @component ButtonSocial
 * @description Botón de redirección interactivo e inteligente para redes externas e internas.
 * * OPTIMIZATION: Resuelve e inyecta de forma dinámica el subcomponente SVG a través del acceso
 * indexado de segundo nivel `IconMap.social[iconName]` garantizando una búsqueda inmediata O(1).
 * * ACCESSIBILITY (A11y): Evalúa programáticamente el prefijo de la URL para añadir de manera segura
 * las directivas `target="_blank"` y `rel="noreferrer"` únicamente si el enlace apunta a un dominio externo.
 */
const ButtonSocial = ({ url, label, iconName }: ButtonSocialProps) => {
  const Icon = IconMap.social[iconName];
  const isExternal = url.startsWith('http');

  return (
    <Link
      href={url}
      target={isExternal ? '_blank' : '_self'}
      {...(isExternal && { rel: 'noopener noreferrer' })}
    >
      {Icon && <Icon />}
      <span className="capitalize">{label}</span>
    </Link>
  );
};

/**
 * @component Hero
 * @description Componente estructural del área superior de la Landing Page. Orquestador encargado
 * de la introducción visual de la marca `lealcloud.dev` en el viewport inicial.
 */
export default function Hero() {
  return (
    <section>
      <div>
        {/* Renderizado condicional por si el badge viene undefined */}
        {CONTENT.badge && <BadgeTarget>{CONTENT.badge}</BadgeTarget>}

        <h1>Hola! soy {CONTENT.name}</h1>
        <p>{CONTENT.description}</p>

        <div>
          {SOCIAL.map((network) => (
            <ButtonSocial
              key={network.name}
              url={network.url}
              label={network.name}
              iconName={network.icon}
            />
          ))}
        </div>
      </div>

      <Image
        src={PROFILE_PHOTO.src}
        alt={PROFILE_PHOTO.alt}
        width={200}
        height={200}
        priority
      />
    </section>
  );
}
