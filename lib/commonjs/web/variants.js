"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVariants = void 0;
var _utils = require("../utils");
var _utils2 = require("./utils");
const hasVariants = value => {
  return (0, _utils2.keyInObject)(value, 'variants');
};
const getVariants = (styles, selectedVariants) => {
  if (!hasVariants(styles)) {
    return {};
  }
  const variantStyles = Object.entries(styles.variants).flatMap(([variant, styles]) => {
    const selectedVariant = selectedVariants[variant];
    const selectedVariantStyles = styles[selectedVariant] ?? styles.default;
    if (!selectedVariantStyles) {
      return [];
    }
    return selectedVariantStyles;
  });
  const compoundVariantStyles = styles.compoundVariants?.flatMap(compoundVariant => {
    const {
      styles,
      ...conditions
    } = compoundVariant;
    if (Object.entries(conditions).some(([variant, value]) => String(selectedVariants[variant]) !== String(value))) {
      return [];
    }
    return styles;
  }) ?? [];
  return (0, _utils.deepMergeObjects)(...variantStyles, ...compoundVariantStyles);
};
exports.getVariants = getVariants;
//# sourceMappingURL=variants.js.map