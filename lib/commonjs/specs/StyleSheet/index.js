"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleSheet = void 0;
var _reactNative = require("react-native");
var _reactNativeNitroModules = require("react-native-nitro-modules");
var _parseBoxShadow = require("../../core/parseBoxShadow");
const HybridUnistylesStyleSheet = _reactNativeNitroModules.NitroModules.createHybridObject('UnistylesStyleSheet');
HybridUnistylesStyleSheet.absoluteFillObject = _reactNative.StyleSheet.absoluteFillObject;
HybridUnistylesStyleSheet.absoluteFill = _reactNative.StyleSheet.absoluteFill;
HybridUnistylesStyleSheet.flatten = _reactNative.StyleSheet.flatten;
HybridUnistylesStyleSheet.compose = _reactNative.StyleSheet.compose;
HybridUnistylesStyleSheet.jsMethods = {
  processColor: _reactNative.processColor,
  parseBoxShadowString: _parseBoxShadow.parseBoxShadowString
};
HybridUnistylesStyleSheet.init();
const StyleSheet = exports.StyleSheet = HybridUnistylesStyleSheet;
//# sourceMappingURL=index.js.map