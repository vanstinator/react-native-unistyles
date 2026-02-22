"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnimatedTheme = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _specs = require("../specs");
const useAnimatedTheme = () => {
  const theme = (0, _reactNativeReanimated.useSharedValue)(_specs.UnistylesRuntime.getTheme());
  (0, _react.useEffect)(() => {
    // @ts-ignore this is hidden from TS
    const dispose = _specs.StyleSheet.addChangeListener(changedDependencies => {
      if (changedDependencies.includes(_specs.UnistyleDependency.Theme)) {
        theme.set(_specs.UnistylesRuntime.getTheme());
      }
    });
    return () => dispose();
  }, []);
  return theme;
};
exports.useAnimatedTheme = useAnimatedTheme;
//# sourceMappingURL=useAnimatedTheme.native.js.map