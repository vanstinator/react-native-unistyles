"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialize = exports.reduceObject = exports.keyInObject = exports.isServer = exports.hyphenate = exports.generateHash = exports.error = exports.equal = void 0;
const reduceObject = (obj, reducer) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, reducer(value, key)]));
exports.reduceObject = reduceObject;
const keyInObject = (obj, key) => key in obj;
exports.keyInObject = keyInObject;
const isServer = () => typeof window === 'undefined' || typeof document === 'undefined';
exports.isServer = isServer;
const error = message => new Error(`Unistyles: ${message}`);
exports.error = error;
const equal = (a, b) => {
  if (Object.is(a, b)) {
    return true;
  }
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false;
  }
  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) {
    return false;
  }
  return keysA.every(key => Object.is(a[key], b[key]) && Object.prototype.hasOwnProperty.call(b, key));
};
exports.equal = equal;
const hyphenate = propertyName => propertyName.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
exports.hyphenate = hyphenate;
const serialize = obj => {
  if (typeof obj !== 'object') {
    return String(obj);
  }
  const sortedKeys = Object.keys(obj).sort();
  const sortedKeyValuePairs = sortedKeys.map(key => `${key}:${serialize(obj[key])}`);
  return `{${sortedKeyValuePairs.join(',')}}`;
};

// Based on https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
exports.serialize = serialize;
const cyrb53 = (data, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < data.length; i++) {
    ch = data.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
const generateHash = value => {
  const serialized = serialize(value);
  return `unistyles_${cyrb53(serialized).toString(36)}`;
};
exports.generateHash = generateHash;
//# sourceMappingURL=common.js.map