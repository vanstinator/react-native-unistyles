"use strict";

import { normalizeNumericValue } from '../utils';
import { getObjectStyle } from './objectStyle';
const normalizeTransform = (key, value) => {
  if (key.includes('scale')) {
    return value;
  }
  if (typeof value === 'number') {
    return normalizeNumericValue(value);
  }
  return value;
};
export const getTransformStyle = transforms => getObjectStyle(transforms, 'transform', (key, value) => {
  switch (key) {
    case 'matrix':
      return `${key}(${value.join(',')})`;
    default:
      return `${key}(${normalizeTransform(key, value)})`;
  }
});
//# sourceMappingURL=transform.js.map