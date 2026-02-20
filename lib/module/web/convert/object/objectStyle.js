"use strict";

import { deepMergeObjects } from '../../../utils';
import { keyInObject } from '../../utils';
const createStylesValue = (styles, normalize) => styles.map(style => {
  const [key] = Object.keys(style);
  if (!key) {
    return undefined;
  }
  return normalize(key, style[key]);
}).filter(Boolean).join(' ');
export const getObjectStyle = (styles, styleKey, normalize) => {
  const breakpoints = new Set();
  const normalStyles = [];
  styles.forEach(style => {
    const [property] = Object.keys(style);
    if (!property) {
      return;
    }
    const value = style[property];
    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.keys(value ?? {}).forEach(breakpoint => breakpoints.add(breakpoint));
      return;
    }
    normalStyles.push(style);
  });
  const breakpointStyles = Array.from(breakpoints).flatMap(breakpoint => {
    const stylesPerBreakpoint = styles.flatMap(style => {
      const [property] = Object.keys(style);
      if (!property) {
        return [];
      }
      const value = style[property];
      if (typeof value === 'object' && !Array.isArray(value)) {
        return keyInObject(value, breakpoint) ? [{
          [property]: value[breakpoint]
        }] : [];
      }
      return [];
    });
    return [{
      [breakpoint]: {
        [styleKey]: createStylesValue(stylesPerBreakpoint, normalize)
      }
    }];
  });
  return deepMergeObjects({
    [styleKey]: createStylesValue(normalStyles, normalize)
  }, ...breakpointStyles);
};
//# sourceMappingURL=objectStyle.js.map