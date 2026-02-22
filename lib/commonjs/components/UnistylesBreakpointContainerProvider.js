"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnistylesBreakpointContainerProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var unistyles = _interopRequireWildcard(require("../web/services"));
var _ContainerBreakpointContext = require("../context/ContainerBreakpointContext");
var _containerUtils = require("./containerUtils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ApplyContainerName = ({
  name
}) => {
  unistyles.services.shadowRegistry.setContainerName(name);
  (0, _react.useLayoutEffect)(() => {
    unistyles.services.shadowRegistry.setContainerName(name);
  });
  return null;
};
const UnistylesBreakpointContainerProvider = ({
  children,
  style
}) => {
  const uniqueId = (0, _react.useId)();
  const containerName = (0, _react.useRef)(`uni-cq-${uniqueId.replace(/:/g, '')}`).current;
  const previousContainerName = unistyles.services.shadowRegistry.getContainerName();
  const containerRef = (0, _react.useRef)(null);
  const {
    store,
    emit
  } = (0, _ContainerBreakpointContext.useContainerBreakpointStore)();
  const breakpoints = unistyles.services.runtime.breakpoints ?? {};
  (0, _react.useLayoutEffect)(() => {
    unistyles.services.shadowRegistry.flush();
  });
  (0, _react.useLayoutEffect)(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const {
      width
    } = element.getBoundingClientRect();
    emit((0, _containerUtils.getBreakpointFromWidth)(width, breakpoints));
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      emit((0, _containerUtils.getBreakpointFromWidth)(entry.contentRect.width, breakpoints));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    containerType: 'inline-size',
    containerName,
    ...style
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContainerBreakpointContext.ContainerBreakpointContext.Provider, {
    value: store,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: containerRef,
      style: containerStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ApplyContainerName, {
        name: containerName
      }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(ApplyContainerName, {
        name: previousContainerName
      })]
    })
  });
};
exports.UnistylesBreakpointContainerProvider = UnistylesBreakpointContainerProvider;
//# sourceMappingURL=UnistylesBreakpointContainerProvider.js.map