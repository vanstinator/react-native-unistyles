"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUnistyles = void 0;
var _ContainerBreakpointContext = require("../context/ContainerBreakpointContext");
var _useProxifiedUnistyles = require("./useProxifiedUnistyles");
const useUnistyles = () => {
  const {
    proxifiedRuntime,
    proxifiedTheme
  } = (0, _useProxifiedUnistyles.useProxifiedUnistyles)();
  const containerBreakpoint = (0, _ContainerBreakpointContext.useContainerBreakpoint)();
  return {
    theme: proxifiedTheme,
    rt: proxifiedRuntime,
    containerBreakpoint
  };
};
exports.useUnistyles = useUnistyles;
//# sourceMappingURL=useUnistyles.js.map