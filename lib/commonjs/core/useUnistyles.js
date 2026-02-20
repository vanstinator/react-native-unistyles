"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUnistyles = void 0;
var _useProxifiedUnistyles = require("./useProxifiedUnistyles");
const useUnistyles = () => {
  const {
    proxifiedRuntime,
    proxifiedTheme
  } = (0, _useProxifiedUnistyles.useProxifiedUnistyles)();
  return {
    theme: proxifiedTheme,
    rt: proxifiedRuntime
  };
};
exports.useUnistyles = useUnistyles;
//# sourceMappingURL=useUnistyles.js.map