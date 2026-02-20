"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerQuery = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ContainerQueryContext = require("../context/ContainerQueryContext");
var _specs = require("../specs");
var _ApplyContainerDimensions = require("./ApplyContainerDimensions");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function getBreakpointFromWidth(width, breakpoints) {
  const sorted = Object.entries(breakpoints).filter(pair => pair[1] !== undefined).sort(([, a], [, b]) => a - b);
  if (sorted.length === 0) {
    return undefined;
  }
  const idx = sorted.findIndex(([, value]) => width < value);
  if (idx <= 0) {
    return sorted[0]?.[0];
  }
  return sorted[idx - 1][0];
}
const ContainerQuery = ({
  children,
  style
}) => {
  const [dims, setDims] = (0, _react.useState)(null);
  const previousContainerDims = (0, _react.useRef)(
  // @ts-expect-error - this is hidden from TS
  _specs.UnistylesShadowRegistry.getContainerDimensions());
  const breakpoints = _specs.UnistylesRuntime.breakpoints ?? {};
  const onLayout = (0, _react.useCallback)(event => {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    const breakpoint = getBreakpointFromWidth(width, breakpoints);
    setDims({
      width,
      height,
      breakpoint
    });
  }, []);
  (0, _react.useLayoutEffect)(() => {
    // @ts-expect-error - this is hidden from TS
    _specs.UnistylesShadowRegistry.flush();
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: style,
    onLayout: onLayout,
    collapsable: false,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ApplyContainerDimensions.ApplyContainerDimensions, {
      dimensions: dims ?? undefined
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContainerQueryContext.ContainerQueryContext.Provider, {
      value: dims,
      children: children
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ApplyContainerDimensions.ApplyContainerDimensions, {
      dimensions: previousContainerDims.current
    })]
  });
};
exports.ContainerQuery = ContainerQuery;
//# sourceMappingURL=ContainerQuery.native.js.map