"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertUnistyles = void 0;
var _utils = require("../../utils");
var _object = require("./object");
var _pseudo = require("./pseudo");
var _shadow = require("./shadow");
var _style = require("./style");
var _utils2 = require("./utils");
const convertUnistyles = (value, runtime) => {
  // Flag to mark if textShadow is already created
  let hasTextShadow = false;
  // Flag to mark if boxShadow is already created
  let hasShadow = false;
  const stylesArray = Object.entries(value).flatMap(([unistylesKey, unistylesValue]) => {
    // Keys to omit
    if (['_classNames', '_web', 'variants', 'compoundVariants', 'uni__dependencies'].includes(unistylesKey) || unistylesKey.startsWith('unistyles_')) {
      return [];
    }

    // Pseudo classes :hover, :before etc.
    if ((0, _pseudo.isPseudo)(unistylesKey)) {
      const flattenValues = convertUnistyles(unistylesValue, runtime);
      return {
        [unistylesKey]: flattenValues
      };
    }

    // Text shadow
    if ((0, _utils2.isTextShadow)(unistylesKey)) {
      if (hasTextShadow) {
        return [];
      }
      hasTextShadow = true;
      return (0, _shadow.getTextShadowStyle)(value);
    }

    // RN shadows
    if ((0, _utils2.isShadow)(unistylesKey)) {
      if (hasShadow) {
        return [];
      }
      hasShadow = true;
      return (0, _shadow.getBoxShadowStyle)(value);
    }
    if ((0, _utils2.isFilter)(unistylesKey, unistylesValue)) {
      return (0, _object.getFilterStyle)(unistylesValue, runtime);
    }
    if ((0, _utils2.isBoxShadow)(unistylesKey, unistylesValue)) {
      return (0, _object.getBoxShadow)(unistylesValue);
    }

    // Transforms
    if ((0, _utils2.isTransform)(unistylesKey, unistylesValue)) {
      return (0, _object.getTransformStyle)(unistylesValue);
    }

    // Breakpoints
    if (typeof unistylesValue === 'object' && unistylesValue !== null) {
      return Object.entries(unistylesValue).map(([breakpointKey, breakpointValue]) => {
        return {
          [breakpointKey]: (0, _style.getStyle)(unistylesKey, breakpointValue)
        };
      });
    }

    // Regular styles
    return (0, _style.getStyle)(unistylesKey, unistylesValue);
  });
  return (0, _utils.deepMergeObjects)(...stylesArray);
};
exports.convertUnistyles = convertUnistyles;
//# sourceMappingURL=index.js.map