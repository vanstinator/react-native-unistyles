"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServerUnistyles = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var unistyles = _interopRequireWildcard(require("../web/services"));
var _utils = require("../web/utils");
var _serialize = require("./serialize");
var _types = require("./types");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getServerUnistyles = ({
  includeRNWStyles = true
} = _types.DefaultServerUnistylesSettings) => {
  if (!(0, _utils.isServer)()) {
    throw (0, _utils.error)('Server styles should only be read on the server');
  }

  // @ts-ignore
  const rnwStyle = includeRNWStyles ? _reactNative.StyleSheet?.getSheet().textContent ?? '' : null;
  const css = unistyles.services.registry.css.getStyles();
  const state = unistyles.services.registry.css.getState();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [rnwStyle && /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
      id: "rnw-style",
      children: rnwStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
      id: "unistyles-web",
      children: css
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("script", {
      id: "unistyles-script",
      defer: true,
      dangerouslySetInnerHTML: {
        __html: `window.__UNISTYLES_STATE__ = ${(0, _serialize.serialize)(state)}`
      }
    })]
  });
};
exports.getServerUnistyles = getServerUnistyles;
//# sourceMappingURL=getServerUnistyles.js.map