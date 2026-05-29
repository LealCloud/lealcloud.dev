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

const CONTENT = {
  badge: 'Disponible para trabajar' as string | undefined,
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
  alt: `${CONTENT.name} — Analista y Desarrollador de Software colombiano.`,
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
      aria-label={`Perfil de ${label} de ${CONTENT.name}`}
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
    <section aria-label="Presentación" className="">
      {/* IMAGEN */}
      <div className="">
        <Image
          src={PROFILE_PHOTO.src}
          alt={PROFILE_PHOTO.alt}
          width={360}
          height={360}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      {/* TEXTO */}
      <div className="">
        {CONTENT.badge && (
          <span aria-label="Estado de disponibilidad" className="">
            {CONTENT.badge}
          </span>
        )}

        <h1 className="">
          Hola! soy <span className="">{CONTENT.name}</span>
        </h1>

        <p className="">{CONTENT.description}</p>

        {/* grupo de enlaces de navegación social */}
        <nav aria-label="Redes sociales y contacto">
          <div className="">
            {SOCIAL.map((network) => (
              <ButtonSocial
                key={network.name}
                url={network.url}
                label={network.name}
                iconName={network.icon}
              />
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
