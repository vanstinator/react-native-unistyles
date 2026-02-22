"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransformStyle = void 0;
var _utils = require("../utils");
var _objectStyle = require("./objectStyle");
const normalizeTransform = (key, value) => {
  if (key.includes('scale')) {
    return value;
  }
  if (typeof value === 'number') {
    return (0, _utils.normalizeNumericValue)(value);
  }
  return value;
};
const getTransformStyle = transforms => (0, _objectStyle.getObjectStyle)(transforms, 'transform', (key, value) => {
  switch (key) {
    case 'matrix':
      return `${key}(${value.join(',')})`;
    default:
      return `${key}(${normalizeTransform(key, value)})`;
  }
});
exports.getTransformStyle = getTransformStyle;
//# sourceMappingURL=transform.js.map