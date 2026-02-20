"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplyScopedTheme = void 0;
var _react = require("react");
var _specs = require("../specs");
const ApplyScopedTheme = ({
  name
}) => {
  _specs.UnistylesShadowRegistry.setScopedTheme(name);
  (0, _react.useLayoutEffect)(() => {
    _specs.UnistylesShadowRegistry.setScopedTheme(name);
  });
  return null;
};
exports.ApplyScopedTheme = ApplyScopedTheme;
//# sourceMappingURL=ApplyScopedTheme.js.map