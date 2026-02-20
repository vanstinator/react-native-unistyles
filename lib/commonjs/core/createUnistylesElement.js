"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUnistylesElement = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../utils");
var _utils2 = require("../web/utils");
var _createUnistylesRef = require("../web/utils/createUnistylesRef");
var _getClassname = require("./getClassname");
var _warn = require("./warn");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const STYLE_PROPS = ['contentContainerStyle', 'columnWrapperStyle'];
const buildUnistylesProps = (Component, props, forwardedRef) => {
  const componentStyleProps = ['style', ...STYLE_PROPS.filter(styleProp => styleProp in props)];
  const classNames = Object.fromEntries(componentStyleProps.map(styleProp => [styleProp, (0, _getClassname.getClassName)(props[styleProp])]));
  const refs = componentStyleProps.map(styleProp => {
    return (0, _createUnistylesRef.createUnistylesRef)(classNames[styleProp], styleProp === 'style' ? forwardedRef : undefined);
  });
  componentStyleProps.forEach(styleProp => {
    (0, _warn.maybeWarnAboutMultipleUnistyles)(props[styleProp], Component.displayName);
  });
  return {
    ...classNames,
    ref: (0, _utils2.isServer)() ? undefined : componentRef => refs.forEach(ref => ref?.(componentRef))
  };
};
const createUnistylesElement = Component => {
  const UnistylesComponent = props => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      ...props,
      ...buildUnistylesProps(Component, props, props.ref)
    });
  };
  return (0, _utils.copyComponentProperties)(Component, UnistylesComponent);
};
exports.createUnistylesElement = createUnistylesElement;
//# sourceMappingURL=createUnistylesElement.js.map