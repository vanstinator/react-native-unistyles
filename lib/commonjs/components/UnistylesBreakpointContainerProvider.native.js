"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnistylesBreakpointContainerProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _specs = require("../specs");
var _ContainerBreakpointContext = require("../context/ContainerBreakpointContext");
var _ApplyContainerBreakpoint = require("./ApplyContainerBreakpoint");
var _containerUtils = require("./containerUtils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
let nextContainerId = 0;
const UnistylesBreakpointContainerProvider = ({
  children,
  onLayout,
  ...props
}) => {
  const containerIdRef = (0, _react.useRef)(++nextContainerId);
  const containerId = containerIdRef.current;
  const previousContainerId = _specs.UnistylesShadowRegistry.getContainerBreakpointId();
  const {
    store,
    emit
  } = (0, _ContainerBreakpointContext.useContainerBreakpointStore)();
  (0, _react.useLayoutEffect)(() => {
    _specs.UnistylesShadowRegistry.flush();
  });
  const mappedChildren = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ApplyContainerBreakpoint.ApplyContainerBreakpoint, {
    containerId: containerId
  }, "apply"), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_ApplyContainerBreakpoint.ApplyContainerBreakpoint, {
    containerId: previousContainerId
  }, "dispose")];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContainerBreakpointContext.ContainerBreakpointContext.Provider, {
    value: store,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      onLayout: e => {
        const {
          width,
          height
        } = e.nativeEvent.layout;
        _specs.UnistylesShadowRegistry.updateContainerSize(containerId, width, height);
        emit((0, _containerUtils.getBreakpointFromWidth)(width, _specs.UnistylesRuntime.breakpoints));
        onLayout?.(e);
      },
      ...props,
      children: mappedChildren
    })
  });
};
exports.UnistylesBreakpointContainerProvider = UnistylesBreakpointContainerProvider;
//# sourceMappingURL=UnistylesBreakpointContainerProvider.native.js.map