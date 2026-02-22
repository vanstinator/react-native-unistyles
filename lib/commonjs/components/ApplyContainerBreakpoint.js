"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplyContainerBreakpoint = void 0;
var _react = require("react");
var _specs = require("../specs");
const ApplyContainerBreakpoint = ({
  containerId
}) => {
  _specs.UnistylesShadowRegistry.setContainerBreakpointId(containerId);
  (0, _react.useLayoutEffect)(() => {
    _specs.UnistylesShadowRegistry.setContainerBreakpointId(containerId);
  });
  return null;
};
exports.ApplyContainerBreakpoint = ApplyContainerBreakpoint;
//# sourceMappingURL=ApplyContainerBreakpoint.js.map