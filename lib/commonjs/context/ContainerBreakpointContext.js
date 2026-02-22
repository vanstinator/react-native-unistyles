"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContainerBreakpointStore = exports.useContainerBreakpoint = exports.ContainerBreakpointContext = void 0;
var _react = require("react");
const ContainerBreakpointContext = exports.ContainerBreakpointContext = /*#__PURE__*/(0, _react.createContext)(null);
const useContainerBreakpointStore = () => {
  const storeRef = (0, _react.useRef)(null);
  if (!storeRef.current) {
    const listeners = new Set();
    let currentBreakpoint = undefined;
    storeRef.current = {
      store: {
        subscribe: callback => {
          listeners.add(callback);
          return () => listeners.delete(callback);
        },
        getSnapshot: () => currentBreakpoint
      },
      emit: breakpoint => {
        if (currentBreakpoint === breakpoint) {
          return;
        }
        currentBreakpoint = breakpoint;
        listeners.forEach(listener => listener());
      }
    };
  }
  return storeRef.current;
};
exports.useContainerBreakpointStore = useContainerBreakpointStore;
const useContainerBreakpoint = () => {
  const store = (0, _react.useContext)(ContainerBreakpointContext);
  return (0, _react.useSyncExternalStore)(store?.subscribe ?? emptySubscribe, store?.getSnapshot ?? emptySnapshot);
};
exports.useContainerBreakpoint = useContainerBreakpoint;
const emptySubscribe = _cb => () => {};
const emptySnapshot = () => undefined;
//# sourceMappingURL=ContainerBreakpointContext.js.map