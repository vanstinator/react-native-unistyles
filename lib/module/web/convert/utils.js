"use strict";

// based on react-native-web normalizer
// https://github.com/necolas/react-native-web
/// <reference path="module.d.ts" />
import normalizeColors from '@react-native/normalize-colors';
import { BOX_SHADOW_STYLES, TEXT_SHADOW_STYLES } from './types';
export const isTransform = (key, value) => key === 'transform' && Array.isArray(value);
export const isTextShadow = key => TEXT_SHADOW_STYLES.includes(key);
export const isShadow = key => BOX_SHADOW_STYLES.includes(key);
export const isFilter = (key, value) => key === 'filter' && Array.isArray(value);
export const isBoxShadow = (key, value) => key === 'boxShadow' && Array.isArray(value);
export const normalizeNumericValue = value => value && typeof value === 'number' ? `${value}px` : value;
export const normalizeColor = (color, opacity = 1) => {
  // If the opacity is 1 there's no need to normalize the color
  if (opacity === 1) {
    return color;
  }
  const integer = normalizeColors(color);

  // If the color is an unknown format, the return value is null
  if (integer === null) {
    return color;
  }
  const hex = integer.toString(16).padStart(8, '0');
  if (hex.length === 8) {
    const [r = 0, g = 0, b = 0, a = 1] = hex.split(/(?=(?:..)*$)/).map(x => Number.parseInt(x, 16)).filter(num => !Number.isNaN(num));
    return `rgba(${r},${g},${b},${a / 255 * opacity})`;
  }
  return color;
};
export const extractShadowValue = (key, breakpoint, styles) => {
  const value = styles[key];
  if (key === 'textShadowOffset' || key === 'shadowOffset') {
    const {
      width,
      height
    } = value;
    return {
      width: typeof width === 'object' ? width[breakpoint] : width,
      height: typeof height === 'object' ? height[breakpoint] : height
    };
  }
  return typeof value === 'object' ? value[breakpoint] : value;
};
//# sourceMappingURL=utils.js.map