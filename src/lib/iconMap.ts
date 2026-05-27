// src/components/ui/icon-map.ts
import {
  RiSunFoggyFill,
  RiMoonClearFill,
  RiMenuLine,
  RiCloseLine,
} from 'react-icons/ri';

/**
 * @fileoverview Mapa de registro y desacoplamiento para iconos globales de la interfaz.
 * Centraliza las referencias de librerías de terceros para empaquetar y proveer componentes
 * de iconografía bajo un esquema de tipado estricto e inferido.
 * @module Components/UI/IconMap
 */

/**
 * Mapeo asociativo inmutable que vincula los identificadores semánticos del tema
 * con sus respectivos componentes de renderizado de iconos.
 */
export const IconMap = {
  light: RiSunFoggyFill,
  dark: RiMoonClearFill,
  menu: RiMenuLine,
  close: RiCloseLine,
};

/**
 * Tipo unión extraído dinámicamente a partir de las claves del `IconMap`.
 * Garantiza validación en tiempo de compilación y autocompletado en el entorno de desarrollo (IDE).
 * @typedef {('light'|'dark')} IconName
 */
export type IconName = keyof typeof IconMap;
