"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassName = void 0;
var unistyles = _interopRequireWildcard(require("../web/services"));
var _utils = require("../web/utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const getClassName = (unistyle, forChild) => {
  if (!unistyle) {
    return undefined;
  }
  const flattenedStyles = Array.isArray(unistyle) ? unistyle.flat(Number.POSITIVE_INFINITY) : [unistyle];
  const animatedStyles = flattenedStyles.filter(_utils.checkForAnimated);
  const regularStyles = flattenedStyles.filter(style => !(0, _utils.checkForAnimated)(style));
  const {
    hash,
    injectedClassName
  } = unistyles.services.shadowRegistry.addStyles(regularStyles, forChild);
  return hash ? [{
    $$css: true,
    hash,
    injectedClassName
  }, animatedStyles] : undefined;
};
exports.getClassName = getClassName;
//# sourceMappingURL=getClassname.js.map