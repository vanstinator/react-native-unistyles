"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerQuery = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ContainerQueryContext = require("../context/ContainerQueryContext");
var unistyles = _interopRequireWildcard(require("../web/services"));
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
const ApplyContainerName = ({
  name
}) => {
  unistyles.services.shadowRegistry.setContainerName(name);
  return null;
};
const ContainerQuery = ({
  children,
  style
}) => {
  const uniqueId = (0, _react.useId)();
  const containerName = `uni-cq-${uniqueId.replace(/:/g, '')}`;
  const containerRef = (0, _react.useRef)(null);
  const [dims, setDims] = (0, _react.useState)(null);
  const breakpoints = unistyles.services.runtime.breakpoints ?? {};
  const previousContainerName = unistyles.services.shadowRegistry.getContainerName();
  const updateDimensions = (0, _react.useCallback)((width, height) => {
    const breakpoint = getBreakpointFromWidth(width, breakpoints);
    setDims({
      width,
      height,
      breakpoint,
      containerName
    });
  }, [containerName]);
  (0, _react.useEffect)(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    element.style.containerType = 'inline-size';
    element.style.containerName = containerName;
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const {
        width,
        height
      } = entry.contentRect;
      updateDimensions(width, height);
    });
    observer.observe(element);
    const {
      width,
      height
    } = element.getBoundingClientRect();
    updateDimensions(width, height);
    return () => observer.disconnect();
  }, [updateDimensions, containerName]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    ref: containerRef,
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ApplyContainerName, {
      name: containerName
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContainerQueryContext.ContainerQueryContext.Provider, {
      value: dims,
      children: children
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ApplyContainerName, {
      name: previousContainerName
    })]
  });
};
exports.ContainerQuery = ContainerQuery;
//# sourceMappingURL=ContainerQuery.js.map