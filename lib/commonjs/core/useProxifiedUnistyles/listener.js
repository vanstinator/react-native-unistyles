"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listener = void 0;
var _specs = require("../../specs");
var unistyles = _interopRequireWildcard(require("../../web/services"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const listener = ({
  dependencies,
  updateTheme,
  updateRuntime
}) => {
  const disposeTheme = unistyles.services.listener.addListeners(dependencies.filter(dependency => dependency === _specs.UnistyleDependency.Theme), updateTheme);
  const disposeRuntime = unistyles.services.listener.addListeners(dependencies.filter(dependency => dependency !== _specs.UnistyleDependency.Theme), dependency => updateRuntime(dependency === _specs.UnistyleDependency.ThemeName));
  return () => {
    disposeTheme();
    disposeRuntime();
  };
};
exports.listener = listener;
//# sourceMappingURL=listener.js.map