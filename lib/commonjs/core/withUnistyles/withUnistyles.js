"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withUnistyles = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _getClassname = require("../getClassname");
var _useProxifiedUnistyles = require("../useProxifiedUnistyles");
var _warn = require("../warn");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// @ts-expect-error

// @ts-expect-error

const withUnistyles = (Component, mappings) => {
  return /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
    const narrowedProps = props;
    const styleClassNames = (0, _getClassname.getClassName)(narrowedProps.style, true);
    const contentContainerStyleClassNames = (0, _getClassname.getClassName)(narrowedProps.contentContainerStyle);
    const {
      proxifiedRuntime,
      proxifiedTheme
    } = (0, _useProxifiedUnistyles.useProxifiedUnistyles)();
    const {
      key: mappingsKey,
      ...mappingsProps
    } = mappings ? mappings(proxifiedTheme, proxifiedRuntime) : {};
    const {
      key: uniPropsKey,
      ...unistyleProps
    } = narrowedProps.uniProps ? narrowedProps.uniProps(proxifiedTheme, proxifiedRuntime) : {};
    const emptyStyles = narrowedProps.style ? Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(narrowedProps.style)).filter(([key]) => !key.startsWith("unistyles") && !key.startsWith("_")).map(([key]) => [key, undefined])) : undefined;
    const combinedProps = {
      ...(0, _utils.deepMergeObjects)(mappingsProps, unistyleProps, props),
      ...(narrowedProps.style ? {
        // Override default component styles with undefined values to reset them
        style: emptyStyles
      } : {}),
      ...(narrowedProps.contentContainerStyle ? {
        contentContainerStyle: contentContainerStyleClassNames
      } : {})
    };

    // @ts-ignore
    (0, _warn.maybeWarnAboutMultipleUnistyles)(narrowedProps.style, `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`);
    // @ts-ignore
    (0, _warn.maybeWarnAboutMultipleUnistyles)(narrowedProps.contentContainerStyle, `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`);
    const NativeComponent = Component;
    const [classNames] = styleClassNames ?? [];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: classNames?.hash,
      style: {
        display: 'contents'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeComponent, {
        ...combinedProps,
        ref: ref
      }, uniPropsKey || mappingsKey)
    });
  });
};
exports.withUnistyles = withUnistyles;
//# sourceMappingURL=withUnistyles.js.map