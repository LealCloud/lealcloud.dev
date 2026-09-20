import type { ComponentProps } from 'react';
import type { IconType } from 'react-icons';

import {
  RiAlertFill,
  RiCloseLine,
  RiLightbulbLine,
  RiMenuLine,
  RiMoonClearFill,
  RiSunFoggyFill,
} from 'react-icons/ri';

import {
  FaAnglesLeft,
  FaAnglesRight,
  FaArrowRight,
  FaChessRook,
  FaCircleUser,
  FaCompassDrafting,
  FaPuzzlePiece,
  FaShieldCat,
} from 'react-icons/fa6';

import {
  SiGit,
  SiJavascript,
  SiLabex,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

import {
  BsEnvelopeArrowUpFill,
  BsFillFileEarmarkTextFill,
  BsGithub,
  BsLinkedin,
} from 'react-icons/bs';

export const IconMap = {
  ui: {
    light: RiSunFoggyFill,
    dark: RiMoonClearFill,
    menu: RiMenuLine,
    close: RiCloseLine,
    architecture: FaCompassDrafting,
    validation: FaShieldCat,
    solid: FaPuzzlePiece,
    growth: FaChessRook,
    bulb: RiLightbulbLine,
    lab: SiLabex,
    anglesLeft: FaAnglesLeft,
    anglesRight: FaAnglesRight,
    arrowright: FaArrowRight,
    alert: RiAlertFill,
    text: BsFillFileEarmarkTextFill,
    user: FaCircleUser,
  },
  tech: {
    react: SiReact,
    nextjs: SiNextdotjs,
    typescript: SiTypescript,
    tailwind: SiTailwindcss,
    javascript: SiJavascript,
    nodejs: SiNodedotjs,
    git: SiGit,
    postgresql: SiPostgresql,
  },
  social: {
    email: BsEnvelopeArrowUpFill,
    github: BsGithub,
    linkedin: BsLinkedin,
  },
} as const;

export type IconCategory = keyof typeof IconMap;
export type UiIconName = keyof (typeof IconMap)['ui'];
export type TechIconName = keyof (typeof IconMap)['tech'];
export type SocialIconName = keyof (typeof IconMap)['social'];

export type IconName = UiIconName | TechIconName | SocialIconName;

/* ====================================================
   Helper para renderizar íconos dinámicamente
   ==================================================== */

type AppIconProps = {
  [C in IconCategory]: { category: C; name: keyof (typeof IconMap)[C] };
}[IconCategory] &
  Omit<ComponentProps<'svg'>, 'name'>;

export function AppIcon({ category, name, ...props }: AppIconProps) {
  const icons = IconMap[category] as Record<string, IconType>;
  const Icon = icons[name];
  if (!Icon) return null;

  // Decorativo por defecto; se puede sobrescribir pasando aria-hidden o aria-label
  return <Icon aria-hidden="true" {...props} />;
}
