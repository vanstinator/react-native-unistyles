"use strict";

import { deepMergeObjects } from '../../../utils';
import { keyInObject } from '../../utils';
import { normalizeNumericValue } from '../utils';
const createBoxShadowValue = style => {
  const {
    offsetX,
    offsetY,
    blurRadius = 0,
    spreadDistance = 0,
    color = '#000',
    inset
  } = style;
  return `${inset ? 'inset ' : ''}${normalizeNumericValue(offsetX)} ${normalizeNumericValue(offsetY)} ${normalizeNumericValue(blurRadius)} ${normalizeNumericValue(spreadDistance)} ${color}`;
};
export const getBoxShadow = boxShadow => {
  const breakpoints = new Set();
  boxShadow.forEach(shadow => {
    const [key] = Object.keys(shadow);
    const value = shadow[key];

    // Breakpoints
    if (typeof value === 'object') {
      Object.keys(value).forEach(breakpoint => breakpoints.add(breakpoint));
    }
  });
  if (breakpoints.size === 0) {
    const boxShadowStyle = Object.fromEntries(boxShadow.map(shadow => {
      const [key] = Object.keys(shadow);
      return [key, shadow[key]];
    }));
    return {
      boxShadow: createBoxShadowValue(boxShadowStyle)
    };
  }
  const breakpointStyles = Array.from(breakpoints).map(breakpoint => {
    const styles = Object.fromEntries(boxShadow.map(shadow => {
      const [key] = Object.keys(shadow);
      const value = shadow[key];
      if (typeof value === 'object' && keyInObject(value, breakpoint)) {
        return [key, value[breakpoint]];
      }
      return [key, value];
    }));
    return {
      [breakpoint]: {
        boxShadow: createBoxShadowValue(styles)
      }
    };
  });
  return deepMergeObjects(...breakpointStyles);
};
//# sourceMappingURL=boxShadow.js.map