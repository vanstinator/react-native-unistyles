"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeText = void 0;
var _react = require("react");
var _core = require("../../core");
// credits to @hirbod
const LeanText = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  return /*#__PURE__*/(0, _react.createElement)('RCTText', {
    ...props,
    ref
  });
});
LeanText.displayName = 'RCTText';
const NativeText = exports.NativeText = (0, _core.createUnistylesElement)(LeanText);
//# sourceMappingURL=NativeText.native.js.map