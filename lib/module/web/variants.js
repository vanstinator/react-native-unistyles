"use strict";

import { deepMergeObjects } from '../utils';
import { keyInObject } from './utils';
const hasVariants = value => {
  return keyInObject(value, 'variants');
};
export const getVariants = (styles, selectedVariants) => {
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
  return deepMergeObjects(...variantStyles, ...compoundVariantStyles);
};
//# sourceMappingURL=variants.js.map