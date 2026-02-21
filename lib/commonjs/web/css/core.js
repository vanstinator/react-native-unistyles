"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToCSS = void 0;
var _pseudo = require("../convert/pseudo");
var _utils = require("../utils");
const convertToCSS = (hash, value, state, containerName) => {
  Object.entries(value).forEach(([styleKey, styleValue]) => {
    if (styleKey[0] === '_') {
      const isStylePseudoClass = (0, _pseudo.isPseudoClass)(styleKey);
      const pseudoClassName = `${hash}${isStylePseudoClass ? ':' : '::'}${styleKey.slice(1)}`;
      Object.entries(styleValue).forEach(([pseudoStyleKey, pseudoStyleValue]) => {
        if (typeof pseudoStyleValue === 'object' && pseudoStyleValue !== null) {
          const allBreakpoints = Object.keys(styleValue);
          Object.entries(pseudoStyleValue).forEach(([breakpointStyleKey, breakpointStyleValue]) => {
            const query = containerName ? (0, _utils.getContainerQuery)(pseudoStyleKey, allBreakpoints, containerName) : (0, _utils.getMediaQuery)(pseudoStyleKey, allBreakpoints);
            state.set({
              mediaQuery: query,
              className: pseudoClassName,
              propertyKey: breakpointStyleKey,
              value: breakpointStyleValue,
              isMq: !!containerName
            });
          });
          return;
        }
        state.set({
          className: pseudoClassName,
          propertyKey: pseudoStyleKey,
          value: pseudoStyleValue
        });
      });
      return;
    }
    if (typeof styleValue === 'object') {
      Object.entries(styleValue).forEach(([breakpointStyleKey, breakpointStyleValue]) => {
        const allBreakpoints = Object.entries(value).filter(([_, value]) => {
          if (typeof value !== 'object' || value === null) {
            return false;
          }
          return breakpointStyleKey in value;
        }).map(([key]) => key);
        const query = containerName ? (0, _utils.getContainerQuery)(styleKey, allBreakpoints, containerName) : (0, _utils.getMediaQuery)(styleKey, allBreakpoints);
        state.set({
          mediaQuery: query,
          className: hash,
          propertyKey: breakpointStyleKey,
          value: breakpointStyleValue,
          isMq: !!containerName
        });
      });
      return;
    }
    state.set({
      className: hash,
      propertyKey: styleKey,
      value: styleValue
    });
  });
};
exports.convertToCSS = convertToCSS;
//# sourceMappingURL=core.js.map