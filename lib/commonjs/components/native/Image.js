"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _core = require("../../core");
var _warn = require("../../core/warn");
var _utils = require("../../utils");
var _utils2 = require("../../web/utils");
var _createUnistylesRef = require("../../web/utils/createUnistylesRef");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const UnistylesImage = /*#__PURE__*/(0, _react.forwardRef)((props, forwardedRef) => {
  const classNames = (0, _core.getClassName)(props.style);
  const ref = (0, _createUnistylesRef.createUnistylesRef)(classNames, forwardedRef);
  const hasWidthStyle = (0, _utils2.checkForProp)(props.style, 'width');
  const hasHeightStyle = (0, _utils2.checkForProp)(props.style, 'height');
  (0, _warn.maybeWarnAboutMultipleUnistyles)(props.style, 'Image');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
    ...props,
    style: [classNames,
    // Clear inline width and height extracted from source
    hasWidthStyle && {
      width: ''
    }, hasHeightStyle && {
      height: ''
    }],
    ref: ref
  });
});
const Image = exports.Image = (0, _utils.copyComponentProperties)(_reactNative.Image, UnistylesImage);
//# sourceMappingURL=Image.js.map