"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  StyleSheet: true,
  UnistylesRuntime: true,
  UnistylesShadowRegistry: true
};
exports.UnistylesShadowRegistry = exports.UnistylesRuntime = exports.StyleSheet = void 0;
var _reactNative = require("react-native");
var _create = require("./create");
var unistyles = _interopRequireWildcard(require("./services"));
var _mock = require("./mock");
Object.keys(_mock).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mock[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mock[key];
    }
  });
});
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const StyleSheet = exports.StyleSheet = {
  configure: unistyles.services.state.init,
  create: _create.create,
  absoluteFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  absoluteFillObject: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  compose: (a, b) => _reactNative.StyleSheet.compose(a, b),
  flatten: (...styles) => _reactNative.StyleSheet.flatten(...styles),
  hairlineWidth: 1
};
const UnistylesRuntime = exports.UnistylesRuntime = unistyles.services.runtime;
const UnistylesShadowRegistry = exports.UnistylesShadowRegistry = unistyles.services.shadowRegistry;
//# sourceMappingURL=index.js.map