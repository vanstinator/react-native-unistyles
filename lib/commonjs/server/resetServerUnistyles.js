"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetServerUnistyles = void 0;
var unistyles = _interopRequireWildcard(require("../web/services"));
var _utils = require("../web/utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const resetServerUnistyles = () => {
  if (!(0, _utils.isServer)()) {
    throw (0, _utils.error)('Server styles should only be reset on the server');
  }
  unistyles.services.registry.reset();
};
exports.resetServerUnistyles = resetServerUnistyles;
//# sourceMappingURL=resetServerUnistyles.js.map