"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maybeWarnAboutMultipleUnistyles = void 0;
const maybeWarnAboutMultipleUnistyles = (style, displayName = 'Unknown') => {
  if (__DEV__ && style && !Array.isArray(style)) {
    const unistylesKeys = Object.keys(style).filter(key => key.startsWith('unistyles_'));
    if (unistylesKeys.length > 1) {
      console.warn(`Unistyles: we detected style object with ${unistylesKeys.length} unistyles styles. This might cause no updates or unpredictable behavior. Please check style prop for "${displayName}" and use array syntax instead of object syntax.`);
    }
  }
};
exports.maybeWarnAboutMultipleUnistyles = maybeWarnAboutMultipleUnistyles;
//# sourceMappingURL=warn.js.map