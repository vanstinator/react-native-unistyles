"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hide = void 0;
var _hooks = require("../hooks");
const Hide = ({
  children,
  ...props
}) => {
  const {
    isVisible
  } = (0, _hooks.useMedia)(props);
  return !isVisible ? children : null;
};
exports.Hide = Hide;
//# sourceMappingURL=Hide.js.map