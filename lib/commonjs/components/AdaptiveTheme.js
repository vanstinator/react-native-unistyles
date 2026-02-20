"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdaptiveTheme = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("../core");
var _specs = require("../specs");
var _ApplyScopedTheme = require("./ApplyScopedTheme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AdaptiveTheme = ({
  children,
  previousScopedTheme
}) => {
  const {
    rt
  } = (0, _core.useUnistyles)();
  const name = rt.colorScheme === 'dark' ? 'light' : 'dark';
  const mappedChildren = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ApplyScopedTheme.ApplyScopedTheme, {
    name: name
  }, name), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_ApplyScopedTheme.ApplyScopedTheme, {
    name: previousScopedTheme
  }, 'dispose')];
  (0, _react.useLayoutEffect)(() => {
    // this will affect only scoped styles as other styles are not yet mounted
    _specs.UnistylesShadowRegistry.flush();
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.default.Fragment, {
    children: mappedChildren
  }, name);
};
exports.AdaptiveTheme = AdaptiveTheme;
//# sourceMappingURL=AdaptiveTheme.js.map