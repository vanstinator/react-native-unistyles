"use strict";

import { isUnistylesMq } from '../../../utils';
import { hyphenate } from '../../utils';
import { normalizeColor, normalizeNumericValue } from '../utils';
import { getObjectStyle } from './objectStyle';
const getDropShadowStyle = dropShadow => {
  const {
    offsetX = 0,
    offsetY = 0,
    standardDeviation = 0,
    color = '#000'
  } = dropShadow;
  return `${normalizeColor(String(color))} ${normalizeNumericValue(offsetX)} ${normalizeNumericValue(offsetY)} ${normalizeNumericValue(standardDeviation)}`;
};
export const getFilterStyle = (filters, runtime) => {
  const restFilters = filters.filter(filter => Object.keys(filter)[0] !== 'dropShadow');
  const dropShadow = (() => {
    const dropShadowValue = filters.find(filter => Object.keys(filter)[0] === 'dropShadow')?.dropShadow;
    if (typeof dropShadowValue !== 'object') {
      return [];
    }
    const breakpoints = Object.keys(dropShadowValue).filter(key => Object.keys(runtime.breakpoints).includes(key) || isUnistylesMq(key));
    const breakpointsDropShadow = Object.fromEntries(breakpoints.map(breakpoint => [breakpoint, getDropShadowStyle(dropShadowValue[breakpoint])]));
    if (breakpoints.length === 0) {
      return [{
        dropShadow: getDropShadowStyle(dropShadowValue)
      }];
    }
    return [{
      dropShadow: breakpointsDropShadow
    }];
  })();
  return getObjectStyle([...restFilters, ...dropShadow], 'filter', (key, value) => `${hyphenate(key)}(${normalizeNumericValue(value)})`);
};
//# sourceMappingURL=filter.js.map