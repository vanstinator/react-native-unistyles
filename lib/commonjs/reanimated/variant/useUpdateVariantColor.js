"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateVariantColor = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _specs = require("../../specs");
var _services = require("../../web/services");
var _utils = require("../../web/utils");
const useUpdateVariantColor = ({
  animateCallback,
  colorKey,
  style
}) => {
  const [dummyDiv] = (0, _react.useState)(() => {
    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
  });
  const parsedStyles = (0, _react.useMemo)(() => {
    return _services.services.shadowRegistry.addStyles([style]).parsedStyles;
  }, [style]);
  const getCurrentColor = (0, _react.useCallback)(() => {
    if (!parsedStyles) {
      return 'rgb(0, 0, 0)';
    }
    const currentColor = parsedStyles[colorKey];
    const currentColorVar = typeof currentColor === 'string' ? currentColor : (0, _utils.getClosestBreakpointValue)(_services.services.runtime, currentColor) ?? 'rgb(0, 0, 0)';
    if (currentColorVar.startsWith('var(--')) {
      dummyDiv.style.color = currentColorVar;
      return getComputedStyle(dummyDiv).color;
    }
    return currentColorVar;
  }, [style, colorKey]);
  const fromValue = (0, _reactNativeReanimated.useSharedValue)(getCurrentColor());
  const toValue = (0, _reactNativeReanimated.useSharedValue)(getCurrentColor());
  (0, _react.useEffect)(() => {
    const dispose = _services.services.listener.addListeners([_specs.UnistyleDependency.Theme], () => {
      (0, _reactNativeReanimated.runOnUI)(() => {
        animateCallback?.(toValue.get(), getCurrentColor());
      })();
    });
    return () => dispose();
  }, [style, colorKey]);
  (0, _react.useLayoutEffect)(() => {
    animateCallback?.(toValue.get(), getCurrentColor());
    const colorStyle = parsedStyles?.[colorKey];
    if (typeof colorStyle !== 'object' || colorStyle === null) {
      return;
    }
    const dispose = _services.services.listener.addListeners([_specs.UnistyleDependency.Breakpoints], () => {
      animateCallback?.(toValue.get(), getCurrentColor());
    });
    return () => dispose();
  }, [style, colorKey]);
  (0, _react.useEffect)(() => () => dummyDiv.remove(), []);
  return {
    fromValue,
    toValue
  };
};
exports.useUpdateVariantColor = useUpdateVariantColor;
//# sourceMappingURL=useUpdateVariantColor.js.map