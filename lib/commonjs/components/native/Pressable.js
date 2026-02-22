"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pressable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _core = require("../../core");
var _specs = require("../../specs");
var _utils = require("../../web/utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Pressable = exports.Pressable = /*#__PURE__*/(0, _react.forwardRef)(({
  style,
  ...props
}, forwardedRef) => {
  const scopedTheme = _specs.UnistylesShadowRegistry.getScopedTheme();
  let storedRef = null;
  let classNames = undefined;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    ...props,
    ref: (0, _utils.isServer)() ? undefined : ref => {
      storedRef = ref;
      // @ts-expect-error hidden from TS
      _specs.UnistylesShadowRegistry.add(storedRef, classNames?.hash);
      if (typeof forwardedRef === 'function') {
        return forwardedRef(ref);
      }
      if (forwardedRef) {
        forwardedRef.current = ref;
      }
    },
    style: state => {
      const styleResult = typeof style === 'function' ? style(state) : style;
      const previousScopedTheme = _specs.UnistylesShadowRegistry.getScopedTheme();
      _specs.UnistylesShadowRegistry.setScopedTheme(scopedTheme);

      // @ts-expect-error hidden from TS
      _specs.UnistylesShadowRegistry.remove(storedRef, classNames?.hash);
      classNames = (0, _core.getClassName)(styleResult);
      // @ts-expect-error hidden from TS
      _specs.UnistylesShadowRegistry.add(storedRef, classNames?.hash);
      _specs.UnistylesShadowRegistry.setScopedTheme(previousScopedTheme);
      return classNames;
    }
  });
});
//# sourceMappingURL=Pressable.js.map