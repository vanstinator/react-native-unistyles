"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _core = require("../../core");
// credits to @hirbod
const LeanView = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  return /*#__PURE__*/(0, _react.createElement)('RCTView', {
    ...props,
    ref
  });
});
LeanView.displayName = 'RCTView';

// this will match default export from react-native
var _default = exports.default = (0, _core.createUnistylesElement)(LeanView);
//# sourceMappingURL=NativeView.native.js.map