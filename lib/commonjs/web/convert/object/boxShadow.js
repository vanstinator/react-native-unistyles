"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoxShadow = void 0;
var _utils = require("../../../utils");
var _utils2 = require("../../utils");
var _utils3 = require("../utils");
const createBoxShadowValue = style => {
  const {
    offsetX,
    offsetY,
    blurRadius = 0,
    spreadDistance = 0,
    color = '#000',
    inset
  } = style;
  return `${inset ? 'inset ' : ''}${(0, _utils3.normalizeNumericValue)(offsetX)} ${(0, _utils3.normalizeNumericValue)(offsetY)} ${(0, _utils3.normalizeNumericValue)(blurRadius)} ${(0, _utils3.normalizeNumericValue)(spreadDistance)} ${color}`;
};
const getBoxShadow = boxShadow => {
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
      if (typeof value === 'object' && (0, _utils2.keyInObject)(value, breakpoint)) {
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
  return (0, _utils.deepMergeObjects)(...breakpointStyles);
};
exports.getBoxShadow = getBoxShadow;
//# sourceMappingURL=boxShadow.js.map