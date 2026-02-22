"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUnistylesImageBackground = void 0;
var _react = _interopRequireDefault(require("react"));
var _specs = require("../specs");
var _utils = require("../utils");
var _passForwardRef = require("./passForwardRef");
var _warn = require("./warn");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createUnistylesImageBackground = Component => {
  const UnistylesImageBackground = /*#__PURE__*/_react.default.forwardRef((props, forwardedRef) => {
    // @ts-expect-error we don't know the type of the component
    (0, _warn.maybeWarnAboutMultipleUnistyles)(props.style, 'ImageBackground');
    // @ts-ignore we don't know the type of the component
    (0, _warn.maybeWarnAboutMultipleUnistyles)(props.imageStyle, 'ImageBackground');
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      ...props,
      ref: ref => {
        return (0, _passForwardRef.passForwardedRef)(ref, forwardedRef, () => {
          // @ts-expect-error - this is hidden from TS
          _specs.UnistylesShadowRegistry.add(ref, props.style);
        }, () => {
          // @ts-expect-error - this is hidden from TS
          _specs.UnistylesShadowRegistry.remove(ref);
        });
      },
      imageRef: ref => {
        // @ts-expect-error web types are not compatible with RN styles
        _specs.UnistylesShadowRegistry.add(ref, props.imageStyle);
        return () => {
          // @ts-ignore this is hidden from TS
          _specs.UnistylesShadowRegistry.remove(ref);
        };
      }
    });
  });
  return (0, _utils.copyComponentProperties)(Component, UnistylesImageBackground);
};
exports.createUnistylesImageBackground = createUnistylesImageBackground;
//# sourceMappingURL=createUnistylesImageBackground.js.map