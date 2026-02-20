"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUnistylesElement = void 0;
var _react = _interopRequireWildcard(require("react"));
var _specs = require("../specs");
var _utils = require("../utils");
var _passForwardRef = require("./passForwardRef");
var _warn = require("./warn");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const createUnistylesElement = Component => {
  const UnistylesComponent = props => {
    const scrollViewRef = (0, _react.useRef)(null);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      ...props,
      ref: ref => {
        (0, _warn.maybeWarnAboutMultipleUnistyles)(props.style, Component.displayName);

        // https://github.com/facebook/react-native/issues/51878
        // tested with ScrollView, REA ScrolLView and Animated ScrollView
        const isScrollView = Component.displayName === 'ScrollView';
        if (isScrollView && ref) {
          scrollViewRef.current = ref;
        }
        if (isScrollView && !ref) {
          // @ts-ignore this is hidden from TS
          _specs.UnistylesShadowRegistry.remove(scrollViewRef.current);
          scrollViewRef.current = null;
          return;
        }
        return (0, _passForwardRef.passForwardedRef)(ref, props.ref, () => {
          // @ts-ignore this is hidden from TS
          _specs.UnistylesShadowRegistry.add(ref, props.style);
        }, () => {
          // @ts-ignore this is hidden from TS
          _specs.UnistylesShadowRegistry.remove(ref);
        });
      }
    });
  };
  return (0, _utils.copyComponentProperties)(Component, UnistylesComponent);
};
exports.createUnistylesElement = createUnistylesElement;
//# sourceMappingURL=createUnistylesElement.native.js.map