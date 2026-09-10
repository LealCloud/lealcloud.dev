import {
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

import { BsEnvelopeArrowUpFill, BsGithub, BsLinkedin } from 'react-icons/bs';

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

export function AppIcon({
  category,
  name,
  ...props
}: {
  category: IconCategory;
  name: IconName;
} & React.ComponentProps<'svg'>) {
  if (category === 'ui') {
    const Icon = IconMap.ui[name as UiIconName];
    return <Icon {...props} />;
  }

  if (category === 'social') {
    const Icon = IconMap.social[name as SocialIconName];
    return <Icon {...props} />;
  }

  // Agrega este bloque que faltaba para 'tech'
  if (category === 'tech') {
    const Icon = IconMap.tech[name as TechIconName];
    return <Icon {...props} />;
  }

  return null;
}
