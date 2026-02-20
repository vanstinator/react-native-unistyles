"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWeb = exports.isIOS = exports.isAndroid = void 0;
var _reactNative = require("react-native");
const isWeb = exports.isWeb = _reactNative.Platform.OS === 'web';
const isIOS = exports.isIOS = _reactNative.Platform.OS === 'ios';
const isAndroid = exports.isAndroid = _reactNative.Platform.OS === 'android';
//# sourceMappingURL=common.js.map