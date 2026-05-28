// src/components/ui/icon-map.ts

import {
  RiSunFoggyFill,
  RiMoonClearFill,
  RiMenuLine,
  RiCloseLine,
} from 'react-icons/ri';

import { BsEnvelopeArrowUpFill, BsGithub, BsLinkedin } from 'react-icons/bs';

/**
 * @fileoverview Mapa de registro y desacoplamiento para iconos globales de la interfaz.
 * Centraliza las referencias de librerías de terceros para empaquetar y proveer componentes
 * de iconografía bajo un esquema de tipado estricto e inferido.
 * @module Components/UI/IconMap
 */

/**
 * @constant IconMap
 * @type {Object}
 * @description Diccionario categórico inmutable que actúa como el registro maestro de iconografía.
 * * ARCHITECTURAL DECISION: Organizado en sub-objetos semánticos (`ui` y `social`) para evitar la contaminación
 * del espacio de nombres plano y estructurar búsquedas binarias ordenadas por contexto.
 * * PERFORMANCE NOTE: El uso del sufijo `as const` es obligatorio aquí; actúa como una aserción de literal
 * para el compilador de TypeScript, bloqueando mutaciones en tiempo de ejecución y forzando a que los componentes
 * de las librerías externas se infieran como tipos de constructores de componentes de React nativos e inmutables.
 */
export const IconMap = {
  ui: {
    light: RiSunFoggyFill,
    dark: RiMoonClearFill,
    menu: RiMenuLine,
    close: RiCloseLine,
  },
  social: {
    email: BsEnvelopeArrowUpFill,
    github: BsGithub,
    linkedin: BsLinkedin,
  },
} as const;

export type IconCategory = keyof typeof IconMap;

/** Tipados específicos por categoría para evitar errores de índice cruzado */
export type UiIconName = keyof (typeof IconMap)['ui'];
export type SocialIconName = keyof (typeof IconMap)['social'];

/** Unión global de nombres para compatibilidad general si es requerida */
export type IconName = UiIconName | SocialIconName;
