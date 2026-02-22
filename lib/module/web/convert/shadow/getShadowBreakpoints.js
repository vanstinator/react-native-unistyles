"use strict";

export const getShadowBreakpoints = (shadowProperties, styles) => {
  const breakpoints = new Set();
  shadowProperties.forEach(key => {
    const value = styles[key];
    if (typeof value !== 'object') {
      return;
    }
    if (key === 'shadowOffset' || key === 'textShadowOffset') {
      const {
        width,
        height
      } = value;

      // If shadowOffset.width has breakpoints
      if (typeof width === 'object') {
        Object.keys(width).forEach(breakpoint => breakpoints.add(breakpoint));
      }

      // If shadowOffset.height has breakpoints
      if (typeof height === 'object') {
        Object.keys(height).forEach(breakpoint => breakpoints.add(breakpoint));
      }
      return;
    }

    // Collect regular breakpoints
    Object.keys(value).forEach(breakpoint => breakpoints.add(breakpoint));
  });
  return Array.from(breakpoints);
};
//# sourceMappingURL=getShadowBreakpoints.js.map