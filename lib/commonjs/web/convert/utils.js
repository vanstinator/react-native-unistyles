"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeNumericValue = exports.normalizeColor = exports.isTransform = exports.isTextShadow = exports.isShadow = exports.isFilter = exports.isBoxShadow = exports.extractShadowValue = void 0;
var _normalizeColors = _interopRequireDefault(require("@react-native/normalize-colors"));
var _types = require("./types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// based on react-native-web normalizer
// https://github.com/necolas/react-native-web
/// <reference path="module.d.ts" />

const isTransform = (key, value) => key === 'transform' && Array.isArray(value);
exports.isTransform = isTransform;
const isTextShadow = key => _types.TEXT_SHADOW_STYLES.includes(key);
exports.isTextShadow = isTextShadow;
const isShadow = key => _types.BOX_SHADOW_STYLES.includes(key);
exports.isShadow = isShadow;
const isFilter = (key, value) => key === 'filter' && Array.isArray(value);
exports.isFilter = isFilter;
const isBoxShadow = (key, value) => key === 'boxShadow' && Array.isArray(value);
exports.isBoxShadow = isBoxShadow;
const normalizeNumericValue = value => value && typeof value === 'number' ? `${value}px` : value;
exports.normalizeNumericValue = normalizeNumericValue;
const normalizeColor = (color, opacity = 1) => {
  // If the opacity is 1 there's no need to normalize the color
  if (opacity === 1) {
    return color;
  }
  const integer = (0, _normalizeColors.default)(color);

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
exports.normalizeColor = normalizeColor;
const extractShadowValue = (key, breakpoint, styles) => {
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
exports.extractShadowValue = extractShadowValue;
//# sourceMappingURL=utils.js.map