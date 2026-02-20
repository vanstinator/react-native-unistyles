"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnimatedVariantColor = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
var _useUpdateVariantColor = require("./useUpdateVariantColor");
const useAnimatedVariantColor = (style, colorKey) => {
  const secretKey = Object.keys(style).find(key => key.startsWith('unistyles_'));
  // @ts-ignore this is hidden from TS
  const hasVariants = style[secretKey]?.__stylesheetVariants;
  if (!hasVariants || !colorKey.toLowerCase().includes('color')) {
    throw new Error('useAnimatedVariantColor: Style was not created by Unistyles, does not have variants or has no color property');
  }
  const {
    fromValue,
    toValue
  } = (0, _useUpdateVariantColor.useUpdateVariantColor)({
    animateCallback: (from, to) => animate(from, to),
    colorKey,
    secretKey,
    style
  });
  const progress = (0, _reactNativeReanimated.useSharedValue)(1);
  const animate = (from, to) => {
    'worklet';

    fromValue.set(from);
    toValue.set(to);
  };
  const derivedColor = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return (0, _reactNativeReanimated.interpolateColor)(progress.value, [0, 1], [fromValue.get(), toValue.get()]);
  });
  return derivedColor;
};
exports.useAnimatedVariantColor = useAnimatedVariantColor;
//# sourceMappingURL=useAnimatedVariantColor.js.map