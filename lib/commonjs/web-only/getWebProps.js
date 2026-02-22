"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWebProps = void 0;
var _core = require("../core");
var _createUnistylesRef = require("../web/utils/createUnistylesRef");
const getWebProps = (style, forwardedRef) => {
  const styles = (0, _core.getClassName)(style);
  const ref = (0, _createUnistylesRef.createUnistylesRef)(styles, forwardedRef);
  const [generatedStyles] = styles ?? [];
  return {
    className: [generatedStyles?.hash, generatedStyles?.injectedClassName].filter(Boolean).join(' '),
    ref
  };
};
exports.getWebProps = getWebProps;
//# sourceMappingURL=getWebProps.js.map