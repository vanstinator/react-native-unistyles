"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Display = void 0;
var _hooks = require("../hooks");
const Display = ({
  children,
  ...props
}) => {
  const {
    isVisible
  } = (0, _hooks.useMedia)(props);
  return isVisible ? children : null;
};
exports.Display = Display;
//# sourceMappingURL=Display.js.map