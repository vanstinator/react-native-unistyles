"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Runtime = void 0;
var _reactNative = require("react-native");
var _reactNativeNitroModules = require("react-native-nitro-modules");
var _common = require("../../common");
var _StatusBar = require("../StatusBar");
const HybridUnistylesRuntime = _reactNativeNitroModules.NitroModules.createHybridObject('UnistylesRuntime');
HybridUnistylesRuntime.statusBar = HybridUnistylesRuntime.createHybridStatusBar();
HybridUnistylesRuntime.navigationBar = HybridUnistylesRuntime.createHybridNavigationBar();
HybridUnistylesRuntime.setRootViewBackgroundColor = color => {
  const parsedColor = (0, _reactNative.processColor)(color) ?? 0;
  HybridUnistylesRuntime.nativeSetRootViewBackgroundColor(parsedColor);
};
if (_common.isIOS) {
  HybridUnistylesRuntime.setImmersiveMode = isEnabled => HybridUnistylesRuntime.statusBar.setHidden(isEnabled, 'fade');
}
if (_common.isAndroid) {
  HybridUnistylesRuntime.setImmersiveMode = HybridUnistylesRuntime.setImmersiveModeNative;
}
(0, _StatusBar.attachStatusBarJSMethods)(HybridUnistylesRuntime.statusBar);
const Runtime = exports.Runtime = HybridUnistylesRuntime;
//# sourceMappingURL=index.js.map