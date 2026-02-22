"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoxShadowStyle = void 0;
var _utils = require("../../../utils");
var _types = require("../types");
var _utils2 = require("../utils");
var _getShadowBreakpoints = require("./getShadowBreakpoints");
const createBoxShadowValue = style => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius
  } = style;
  const offsetX = (0, _utils2.normalizeNumericValue)(shadowOffset?.width ?? 0);
  const offsetY = (0, _utils2.normalizeNumericValue)(shadowOffset?.height ?? 0);
  const radius = (0, _utils2.normalizeNumericValue)(shadowRadius ?? 0);
  const color = (0, _utils2.normalizeColor)(shadowColor ?? '#000000', shadowOpacity ?? 1);
  return `${offsetX} ${offsetY} ${radius} ${color}`;
};
const getBoxShadowStyle = styles => {
  const breakpoints = (0, _getShadowBreakpoints.getShadowBreakpoints)(_types.BOX_SHADOW_STYLES, styles);

  // If no breakpoints were used return styles without media queries
  if (breakpoints.length === 0) {
    return {
      boxShadow: createBoxShadowValue(styles)
    };
  }

  // Create boxShadow for each breakpoint
  const breakpointStyles = breakpoints.map(breakpoint => {
    const color = (0, _utils2.extractShadowValue)('shadowColor', breakpoint, styles);
    const {
      width,
      height
    } = (0, _utils2.extractShadowValue)('shadowOffset', breakpoint, styles);
    const radius = (0, _utils2.extractShadowValue)('shadowRadius', breakpoint, styles);
    const opacity = (0, _utils2.extractShadowValue)('shadowOpacity', breakpoint, styles);
    return {
      [breakpoint]: {
        boxShadow: createBoxShadowValue({
          shadowColor: color,
          shadowOffset: {
            width,
            height
          },
          shadowRadius: radius,
          shadowOpacity: opacity
        })
      }
    };
  });

  // Merge all breakpoints styles into one
  return (0, _utils.deepMergeObjects)(...breakpointStyles);
};
exports.getBoxShadowStyle = getBoxShadowStyle;
//# sourceMappingURL=boxShadow.js.map