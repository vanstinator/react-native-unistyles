"use strict";

import { hyphenate } from '../utils';
export const safeGetMap = (map, key) => {
  const nextLevelMap = map.get(key);
  if (!nextLevelMap) {
    const newMap = new Map();
    map.set(key, newMap);
    return newMap;
  }
  return nextLevelMap;
};
export const getStylesFromState = state => {
  let styles = '';
  const generate = (mediaQuery, secondLevelMap) => {
    if (mediaQuery) {
      styles += `${mediaQuery}{`;
    }
    for (const [className, thirdLevelMap] of secondLevelMap) {
      styles += `.${className}{`;
      for (const [propertyKey, value] of thirdLevelMap) {
        if (value === undefined) {
          continue;
        }
        styles += `${hyphenate(propertyKey)}:${value};`;
      }
      styles += '}';
    }
    if (mediaQuery) {
      styles += '}';
    }
  };
  for (const [mediaQuery, secondLevelMap] of state.mainMap) {
    generate(mediaQuery, secondLevelMap);
  }
  for (const [mediaQuery, secondLevelMap] of state.mqMap) {
    generate(mediaQuery, secondLevelMap);
  }
  return styles;
};
//# sourceMappingURL=utils.js.map