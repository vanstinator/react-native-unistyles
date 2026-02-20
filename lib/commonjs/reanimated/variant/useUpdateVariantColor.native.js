"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateVariantColor = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _specs = require("../../specs");
const useUpdateVariantColor = ({
  colorKey,
  style,
  secretKey
}) => {
  const fromValue = (0, _reactNativeReanimated.useSharedValue)(style[colorKey]);
  const toValue = (0, _reactNativeReanimated.useSharedValue)(style[colorKey]);
  (0, _react.useEffect)(() => {
    // @ts-ignore this is hidden from TS
    const dispose = _specs.StyleSheet.addChangeListener(changedDependencies => {
      if (changedDependencies.includes(_specs.UnistyleDependency.Theme) || changedDependencies.includes(_specs.UnistyleDependency.Breakpoints)) {
        // @ts-ignore
        const newStyles = style[secretKey]?.uni__getStyles();
        fromValue.set(toValue.value);
        toValue.set(newStyles[colorKey]);
      }
    });
    return () => dispose();
  }, [style, colorKey]);
  (0, _react.useLayoutEffect)(() => {
    fromValue.set(toValue.value);
    toValue.set(style[colorKey]);
  }, [style, colorKey]);
  return {
    fromValue,
    toValue
  };
};
exports.useUpdateVariantColor = useUpdateVariantColor;
//# sourceMappingURL=useUpdateVariantColor.native.js.map