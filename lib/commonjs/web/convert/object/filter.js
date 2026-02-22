"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilterStyle = void 0;
var _utils = require("../../../utils");
var _utils2 = require("../../utils");
var _utils3 = require("../utils");
var _objectStyle = require("./objectStyle");
const getDropShadowStyle = dropShadow => {
  const {
    offsetX = 0,
    offsetY = 0,
    standardDeviation = 0,
    color = '#000'
  } = dropShadow;
  return `${(0, _utils3.normalizeColor)(String(color))} ${(0, _utils3.normalizeNumericValue)(offsetX)} ${(0, _utils3.normalizeNumericValue)(offsetY)} ${(0, _utils3.normalizeNumericValue)(standardDeviation)}`;
};
const getFilterStyle = (filters, runtime) => {
  const restFilters = filters.filter(filter => Object.keys(filter)[0] !== 'dropShadow');
  const dropShadow = (() => {
    const dropShadowValue = filters.find(filter => Object.keys(filter)[0] === 'dropShadow')?.dropShadow;
    if (typeof dropShadowValue !== 'object') {
      return [];
    }
    const breakpoints = Object.keys(dropShadowValue).filter(key => Object.keys(runtime.breakpoints).includes(key) || (0, _utils.isUnistylesMq)(key));
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
  return (0, _objectStyle.getObjectStyle)([...restFilters, ...dropShadow], 'filter', (key, value) => `${(0, _utils2.hyphenate)(key)}(${(0, _utils3.normalizeNumericValue)(value)})`);
};
exports.getFilterStyle = getFilterStyle;
//# sourceMappingURL=filter.js.map