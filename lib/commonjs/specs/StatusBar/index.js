"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachStatusBarJSMethods = void 0;
var _reactNative = require("react-native");
var _types = require("../types");
const attachStatusBarJSMethods = hybridObject => {
  hybridObject.setStyle = (style, animated) => {
    switch (style) {
      case _types.StatusBarStyle.Light:
        return _reactNative.StatusBar.setBarStyle('light-content', animated);
      case _types.StatusBarStyle.Dark:
        return _reactNative.StatusBar.setBarStyle('dark-content', animated);
      case _types.StatusBarStyle.Default:
        return _reactNative.StatusBar.setBarStyle('default', animated);
    }
  };
  const privateHybrid = hybridObject;
  hybridObject.setHidden = (isHidden, animation) => {
    _reactNative.StatusBar.setHidden(isHidden, animation);
    privateHybrid.setHiddenNative(isHidden);
  };
};
exports.attachStatusBarJSMethods = attachStatusBarJSMethods;
//# sourceMappingURL=index.js.map