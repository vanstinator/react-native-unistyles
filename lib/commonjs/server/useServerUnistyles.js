"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useServerUnistyles = void 0;
var _react = require("react");
var _utils = require("../web/utils");
var _getServerUnistyles = require("./getServerUnistyles");
var _hydrateServerUnistyles = require("./hydrateServerUnistyles");
var _resetServerUnistyles = require("./resetServerUnistyles");
var _types = require("./types");
const useServerUnistyles = (settings = _types.DefaultServerUnistylesSettings) => {
  const isServerInserted = (0, _react.useRef)(false);
  if ((0, _utils.isServer)() && !isServerInserted.current) {
    isServerInserted.current = true;
    const components = (0, _getServerUnistyles.getServerUnistyles)(settings);
    (0, _resetServerUnistyles.resetServerUnistyles)();
    return components;
  }
  if (!(0, _utils.isServer)()) {
    (0, _hydrateServerUnistyles.hydrateServerUnistyles)();
  }
  return null;
};
exports.useServerUnistyles = useServerUnistyles;
//# sourceMappingURL=useServerUnistyles.js.map