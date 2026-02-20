"use strict";

import { keyInObject } from '../utils';
const SKIP_STYLES = new Set(['borderCurve', 'elevation', 'textAlignVertical', 'includeFontPadding', 'overlayColor', 'tintColor']);
const CSS_NUMBER_KEYS = new Set(['animationIterationCount', 'borderImageOutset', 'borderImageSlice', 'borderImageWidth', 'boxFlex', 'boxFlexGroup', 'boxOrdinalGroup', 'columnCount', 'columns', 'counterIncrement', 'counterReset', 'flex', 'flexGrow', 'flexPositive', 'flexShrink', 'flexNegative', 'flexOrder', 'fontWeight', 'gridArea', 'gridColumn', 'gridColumnEnd', 'gridColumnSpan', 'gridColumnStart', 'gridRow', 'gridRowEnd', 'gridRowSpan', 'gridRowStart', 'line-clamp', 'line-height', 'opacity', 'order', 'orphans', 'tabSize', 'widows', 'zIndex', 'zoom', 'fillOpacity', 'floodOpacity', 'stopOpacity', 'strokeDasharray', 'strokeDashoffset', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth', 'aspectRatio']);
const convertMap = {
  marginHorizontal: value => ({
    marginInline: value
  }),
  marginVertical: value => ({
    marginBlock: value
  }),
  paddingHorizontal: value => ({
    paddingInline: value
  }),
  paddingVertical: value => ({
    paddingBlock: value
  }),
  writingDirection: value => ({
    direction: value
  }),
  borderBottomEndRadius: value => ({
    borderBottomRightRadius: value
  }),
  borderBottomStartRadius: value => ({
    borderBottomLeftRadius: value
  }),
  borderEndColor: value => ({
    borderInlineEndColor: value
  }),
  borderStartColor: value => ({
    borderInlineStartColor: value
  }),
  borderTopEndRadius: value => ({
    borderTopRightRadius: value
  }),
  borderTopStartRadius: value => ({
    borderTopLeftRadius: value
  }),
  borderEndWidth: value => ({
    borderInlineEndWidth: value
  }),
  borderStartWidth: value => ({
    borderInlineStartWidth: value
  }),
  end: value => ({
    right: value
  }),
  start: value => ({
    left: value
  }),
  marginEnd: value => ({
    marginRight: value
  }),
  marginStart: value => ({
    marginLeft: value
  }),
  paddingEnd: value => ({
    paddingRight: value
  }),
  paddingStart: value => ({
    paddingLeft: value
  }),
  transformMatrix: value => ({
    transform: `matrix(${value.join(', ')})`
  }),
  resizeMode: value => ({
    backgroundSize: value
  })
};
const convertNumber = (key, value) => {
  if (typeof value === 'number') {
    return CSS_NUMBER_KEYS.has(key) ? value : `${value}px`;
  }
  return value;
};
export const getStyle = (key, value) => {
  if (SKIP_STYLES.has(key)) {
    return {};
  }
  if (keyInObject(convertMap, key)) {
    return convertMap[key]?.(convertNumber(key, value)) ?? {};
  }
  return {
    [key]: convertNumber(key, value)
  };
};
//# sourceMappingURL=style.js.map