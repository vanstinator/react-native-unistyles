"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;
var unistyles = _interopRequireWildcard(require("./services"));
var _utils = require("./utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const create = (stylesheet, id) => {
  if (!id) {
    throw (0, _utils.error)('Unistyles is not initialized correctly. Please add babel plugin to your babel config.');
  }

  // For SSR
  if (!unistyles.services.state.isInitialized && !(0, _utils.isServer)()) {
    const config = window?.__UNISTYLES_STATE__?.config;
    config && unistyles.services.state.init(config);
  }
  const computedStylesheet = unistyles.services.registry.getComputedStylesheet(stylesheet);
  const addSecrets = (value, key, args = undefined, variants = {}) => (0, _utils.assignSecrets)(value, {
    __uni__key: key,
    __uni__stylesheet: stylesheet,
    __uni__args: args,
    __stylesheetVariants: variants
  });
  const createStyleSheetStyles = variants => {
    const stylesEntries = Object.entries(computedStylesheet).map(([key, value]) => {
      if (typeof value === 'function') {
        return [key, (...args) => {
          const result = (0, _utils.removeInlineStyles)(value(...args));
          return addSecrets(result, key, args, variants);
        }];
      }
      return [key, addSecrets((0, _utils.removeInlineStyles)(value), key, undefined, variants)];
    });
    return Object.fromEntries(stylesEntries.concat([useVariants]));
  };
  const useVariants = ['useVariants', variants => {
    return createStyleSheetStyles(variants);
  }];
  return createStyleSheetStyles();
};
exports.create = create;
//# sourceMappingURL=create.js.map