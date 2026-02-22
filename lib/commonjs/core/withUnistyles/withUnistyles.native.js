"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withUnistyles = void 0;
var _react = _interopRequireWildcard(require("react"));
var _specs = require("../../specs");
var _utils = require("../../utils");
var _useProxifiedUnistyles = require("../useProxifiedUnistyles");
var _warn = require("../warn");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// @ts-expect-error

// @ts-expect-error

const withUnistyles = (Component, mappings) => {
  const getSecrets = (styleProps = {}) => {
    const styles = Array.isArray(styleProps) ? styleProps.flat() : [styleProps];
    const secrets = styles.filter(Boolean).reduce((acc, style) => {
      const unistyleKey = Object.keys(style).find(key => key.startsWith('unistyles_'));
      return acc.concat([unistyleKey ? style[unistyleKey] : {
        uni__getStyles: () => style,
        uni__dependencies: []
      }]);
    }, []);
    return {
      styles: secrets.reduce((acc, secret) => Object.assign(acc, secret.uni__getStyles()), {}),
      dependencies: secrets.flatMap(secret => secret.uni__dependencies)
    };
  };
  return /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
    const narrowedProps = props;
    const NativeComponent = Component;

    // @ts-ignore we don't know the type of the component
    (0, _warn.maybeWarnAboutMultipleUnistyles)(narrowedProps.style, `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`);
    // @ts-ignore we don't know the type of the component
    (0, _warn.maybeWarnAboutMultipleUnistyles)(narrowedProps.contentContainerStyle, `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`);
    const scopedTheme = (0, _react.useRef)(_specs.UnistylesShadowRegistry.getScopedTheme());
    const {
      proxifiedRuntime,
      proxifiedTheme,
      addDependencies
    } = (0, _useProxifiedUnistyles.useProxifiedUnistyles)(scopedTheme.current);
    (0, _react.useEffect)(() => {
      const styleSecrets = getSecrets(narrowedProps.style);
      const contentContainerStyleSecrets = getSecrets(narrowedProps.contentContainerStyle);
      addDependencies(Array.from(new Set([...styleSecrets.dependencies, ...contentContainerStyleSecrets.dependencies])));
    }, [narrowedProps.style, narrowedProps.contentContainerStyle]);
    const {
      key: mappingsKey,
      ...mappingsProps
    } = mappings ? mappings(proxifiedTheme, proxifiedRuntime) : {};
    const {
      key: uniPropsKey,
      ...unistyleProps
    } = narrowedProps.uniProps ? narrowedProps.uniProps(proxifiedTheme, proxifiedRuntime) : {};
    const styleSecrets = getSecrets(narrowedProps.style);
    const contentContainerStyleSecrets = getSecrets(narrowedProps.contentContainerStyle);
    const finalProps = {
      ...(0, _utils.deepMergeObjects)(mappingsProps, unistyleProps, props),
      ...(narrowedProps.style ? {
        style: styleSecrets.styles
      } : {}),
      ...(narrowedProps.contentContainerStyle ? {
        contentContainerStyle: contentContainerStyleSecrets.styles
      } : {})
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeComponent, {
      ...finalProps,
      ref: ref
    }, uniPropsKey || mappingsKey);
  });
};
exports.withUnistyles = withUnistyles;
//# sourceMappingURL=withUnistyles.native.js.map