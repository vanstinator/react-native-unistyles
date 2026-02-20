"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnimatedTheme = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _specs = require("../specs");
var _services = require("../web/services");
const useAnimatedTheme = () => {
  const theme = (0, _reactNativeReanimated.useSharedValue)(_specs.UnistylesRuntime.getTheme());
  (0, _react.useEffect)(() => {
    const dispose = _services.services.listener.addListeners([_specs.UnistyleDependency.Theme], () => theme.set(_specs.UnistylesRuntime.getTheme()));
    return () => {
      dispose();
    };
  }, []);
  return theme;
};
exports.useAnimatedTheme = useAnimatedTheme;
//# sourceMappingURL=useAnimatedTheme.js.map