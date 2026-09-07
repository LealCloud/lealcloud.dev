import {
  RiCloseLine,
  RiMenuLine,
  RiMoonClearFill,
  RiSunFoggyFill,
} from 'react-icons/ri';

import {
  FaChessRook,
  FaCompassDrafting,
  FaPuzzlePiece,
  FaShieldCat,
} from 'react-icons/fa6';

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
  },
  social: {
    email: BsEnvelopeArrowUpFill,
    github: BsGithub,
    linkedin: BsLinkedin,
  },
} as const;

export type IconCategory = keyof typeof IconMap;
export type UiIconName = keyof (typeof IconMap)['ui'];
export type SocialIconName = keyof (typeof IconMap)['social'];
export type IconName = UiIconName | SocialIconName;

/**
 * Helper para renderizar íconos dinámicamente
 */
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

  return null;
}
