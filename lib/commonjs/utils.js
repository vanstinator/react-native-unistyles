"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMq = exports.isValidMq = exports.isUnistylesMq = exports.isDefined = exports.deepMergeObjects = exports.copyComponentProperties = void 0;
const isDefined = value => value !== undefined && value !== null;
exports.isDefined = isDefined;
const deepMergeObjects = (...sources) => {
  const target = {};
  sources.filter(isDefined).forEach(source => {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key];
      const targetValue = target[key];
      if (Object(sourceValue) === sourceValue && Object(targetValue) === targetValue) {
        // @ts-expect-error - can't assign to generic
        target[key] = deepMergeObjects(targetValue, sourceValue);
        return;
      }

      // @ts-expect-error - can't assign to generic
      target[key] = sourceValue;
    });
  });
  return target;
};
exports.deepMergeObjects = deepMergeObjects;
const copyComponentProperties = (Component, UnistylesComponent) => {
  Object.entries(Component).forEach(([key, value]) => {
    // Filter out the keys we don't want to copy
    if (['$$typeof', 'render', 'contextType'].includes(key)) {
      return;
    }
    UnistylesComponent[key] = value;
  });
  UnistylesComponent.displayName = Component.displayName;
  return UnistylesComponent;
};
exports.copyComponentProperties = copyComponentProperties;
const IS_UNISTYLES_REGEX = /:([hw])\[(\d+)(?:,\s*(\d+|Infinity))?]/;
const UNISTYLES_WIDTH_REGEX = /:(w)\[(\d+)(?:,\s*(\d+|Infinity))?]/;
const UNISTYLES_HEIGHT_REGEX = /:(h)\[(\d+)(?:,\s*(\d+|Infinity))?]/;
const isUnistylesMq = mq => IS_UNISTYLES_REGEX.test(mq);
exports.isUnistylesMq = isUnistylesMq;
const parseMq = mq => {
  const [, width, fromW, toW] = UNISTYLES_WIDTH_REGEX.exec(mq) || [];
  const [, height, fromH, toH] = UNISTYLES_HEIGHT_REGEX.exec(mq) || [];
  return {
    minWidth: !width || fromW === 'Infinity' ? undefined : Number(fromW),
    maxWidth: !width || toW === 'Infinity' ? undefined : Number(toW),
    minHeight: !height || fromH === 'Infinity' ? undefined : Number(fromH),
    maxHeight: !height || toH === 'Infinity' ? undefined : Number(toH)
  };
};
exports.parseMq = parseMq;
const isValidMq = parsedMQ => {
  const isWidthValid = parsedMQ.minWidth === undefined || parsedMQ.maxWidth === undefined || parsedMQ.minWidth <= parsedMQ.maxWidth;
  const isHeightValid = parsedMQ.minHeight === undefined || parsedMQ.maxHeight === undefined || parsedMQ.minHeight <= parsedMQ.maxHeight;
  return isWidthValid && isHeightValid;
};
exports.isValidMq = isValidMq;
//# sourceMappingURL=utils.js.map