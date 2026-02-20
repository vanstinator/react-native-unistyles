"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopedTheme = void 0;
var _react = _interopRequireDefault(require("react"));
var _specs = require("../specs");
var _AdaptiveTheme = require("./AdaptiveTheme");
var _NamedTheme = require("./NamedTheme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ScopedTheme = ({
  name,
  children,
  invertedAdaptive,
  reset
}) => {
  const hasAdaptiveThemes = _specs.UnistylesRuntime.hasAdaptiveThemes;
  const isAdaptiveTheme = invertedAdaptive && hasAdaptiveThemes;
  const previousScopedTheme = _specs.UnistylesShadowRegistry.getScopedTheme();
  switch (true) {
    case name !== undefined:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NamedTheme.NamedTheme, {
        name: name,
        previousScopedTheme: previousScopedTheme,
        children: children
      });
    case isAdaptiveTheme:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_AdaptiveTheme.AdaptiveTheme, {
        previousScopedTheme: previousScopedTheme,
        children: children
      });
    case reset:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NamedTheme.NamedTheme, {
        name: undefined,
        previousScopedTheme: previousScopedTheme,
        children: children
      });
    default:
      return children;
  }
};
exports.ScopedTheme = ScopedTheme;
//# sourceMappingURL=ScopedTheme.js.map