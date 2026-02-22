"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreakpointFromWidth = void 0;
const getBreakpointFromWidth = (width, breakpoints) => {
  const sorted = Object.entries(breakpoints).filter(pair => pair[1] !== undefined).sort(([, a], [, b]) => a - b);
  if (sorted.length === 0) {
    return undefined;
  }
  const idx = sorted.findIndex(([, value]) => width < value);
  if (idx <= 0) {
    return sorted[0]?.[0];
  }
  return sorted[idx - 1][0];
};
exports.getBreakpointFromWidth = getBreakpointFromWidth;
//# sourceMappingURL=containerUtils.js.map