"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUnistylesRef = void 0;
var unistyles = _interopRequireWildcard(require("../services"));
var _common = require("./common");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const createUnistylesRef = (styles, forwardedRef) => {
  const storedRef = {
    current: null
  };
  const [classNames] = styles ?? [];
  return (0, _common.isServer)() ? undefined : ref => {
    if (!ref) {
      unistyles.services.shadowRegistry.remove(storedRef, classNames?.hash);
    }
    storedRef.current = ref;
    unistyles.services.shadowRegistry.add(ref, classNames?.hash);
    if (typeof forwardedRef === 'function') {
      return forwardedRef(ref);
    }
    if (forwardedRef) {
      forwardedRef.current = ref;
    }
  };
};
exports.createUnistylesRef = createUnistylesRef;
//# sourceMappingURL=createUnistylesRef.js.map