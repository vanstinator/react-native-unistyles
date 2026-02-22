"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pressable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _core = require("../../core");
var _specs = require("../../specs");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const getStyles = (styleProps = {}) => {
  const unistyleKey = Object.keys(styleProps).find(key => key.startsWith('unistyles_'));
  if (!unistyleKey) {
    return styleProps;
  }
  return {
    // styles without C++ state
    ...styleProps[unistyleKey].uni__getStyles(),
    [unistyleKey]: styleProps[unistyleKey]
  };
};
const Pressable = exports.Pressable = /*#__PURE__*/(0, _react.forwardRef)(({
  variants,
  style,
  ...props
}, forwardedRef) => {
  const storedRef = (0, _react.useRef)(null);
  const scopedTheme = _specs.UnistylesShadowRegistry.getScopedTheme();
  (0, _react.useLayoutEffect)(() => {
    return () => {
      if (storedRef.current) {
        // @ts-expect-error - this is hidden from TS
        _specs.UnistylesShadowRegistry.remove(storedRef.current);
      }
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    ...props,
    ref: ref => {
      const isPropStyleAFunction = typeof style === 'function';
      const unistyles = isPropStyleAFunction ? style.call(style, {
        pressed: false
      }) : getStyles(style);
      if (ref) {
        storedRef.current = ref;
      }
      return (0, _core.passForwardedRef)(ref, forwardedRef, () => {
        // @ts-expect-error - this is hidden from TS
        _specs.UnistylesShadowRegistry.add(ref, unistyles);
      }, () => {
        // @ts-expect-error - this is hidden from TS
        _specs.UnistylesShadowRegistry.remove(ref);
      });
    },
    style: state => {
      const isPropStyleAFunction = typeof style === 'function';
      const previousScopedTheme = _specs.UnistylesShadowRegistry.getScopedTheme();
      _specs.UnistylesShadowRegistry.setScopedTheme(scopedTheme);
      const unistyles = isPropStyleAFunction ? style.call(style, state) : getStyles(style);
      if (!storedRef.current) {
        return unistyles;
      }

      // @ts-expect-error - this is hidden from TS
      _specs.UnistylesShadowRegistry.remove(storedRef.current);

      // @ts-expect-error - this is hidden from TS
      _specs.UnistylesShadowRegistry.add(storedRef.current, unistyles);
      _specs.UnistylesShadowRegistry.setScopedTheme(previousScopedTheme);
      return unistyles;
    }
  });
});
//# sourceMappingURL=Pressable.native.js.map