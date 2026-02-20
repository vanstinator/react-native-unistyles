"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplyContainerDimensions = void 0;
var _react = require("react");
var _specs = require("../specs");
const ApplyContainerDimensions = ({
  dimensions
}) => {
  // @ts-expect-error - this is hidden from TS
  _specs.UnistylesShadowRegistry.setContainerDimensions(dimensions);
  (0, _react.useLayoutEffect)(() => {
    // @ts-expect-error - this is hidden from TS
    _specs.UnistylesShadowRegistry.setContainerDimensions(dimensions);
  });
  return null;
};
exports.ApplyContainerDimensions = ApplyContainerDimensions;
//# sourceMappingURL=ApplyContainerDimensions.js.map