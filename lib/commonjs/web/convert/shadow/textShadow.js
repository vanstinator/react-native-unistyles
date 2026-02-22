"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextShadowStyle = void 0;
var _utils = require("../../../utils");
var _types = require("../types");
var _utils2 = require("../utils");
var _getShadowBreakpoints = require("./getShadowBreakpoints");
const createTextShadowValue = style => {
  const {
    textShadowColor,
    textShadowOffset,
    textShadowRadius
  } = style;
  const offsetX = (0, _utils2.normalizeNumericValue)(textShadowOffset?.width ?? 0);
  const offsetY = (0, _utils2.normalizeNumericValue)(textShadowOffset?.height ?? 0);
  const radius = (0, _utils2.normalizeNumericValue)(textShadowRadius ?? 0);
  const color = (0, _utils2.normalizeColor)(textShadowColor ?? '#000000');
  return `${offsetX} ${offsetY} ${radius} ${color}`;
};
const getTextShadowStyle = styles => {
  const breakpoints = (0, _getShadowBreakpoints.getShadowBreakpoints)(_types.TEXT_SHADOW_STYLES, styles);

  // If no breakpoints were used return styles without media queries
  if (breakpoints.length === 0) {
    return {
      textShadow: createTextShadowValue(styles)
    };
  }

  // Create textShadow for each breakpoint
  const breakpointStyles = breakpoints.map(breakpoint => {
    const color = (0, _utils2.extractShadowValue)('textShadowColor', breakpoint, styles);
    const {
      width,
      height
    } = (0, _utils2.extractShadowValue)('textShadowOffset', breakpoint, styles);
    const radius = (0, _utils2.extractShadowValue)('textShadowRadius', breakpoint, styles);
    return {
      [breakpoint]: {
        textShadow: createTextShadowValue({
          textShadowColor: color,
          textShadowOffset: {
            width,
            height
          },
          textShadowRadius: radius
        })
      }
    };
  });

  // Merge all breakpoints styles into one
  return (0, _utils.deepMergeObjects)(...breakpointStyles);
};
exports.getTextShadowStyle = getTextShadowStyle;
//# sourceMappingURL=textShadow.js.map