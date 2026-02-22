"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listener = void 0;
var _specs = require("../../specs");
const listener = ({
  dependencies,
  updateTheme,
  updateRuntime
}) => {
  const listensToTheme = dependencies.includes(_specs.UnistyleDependency.Theme);
  // @ts-expect-error - this is hidden from TS
  const dispose = _specs.StyleSheet.addChangeListener(changedDependencies => {
    if (listensToTheme && changedDependencies.includes(_specs.UnistyleDependency.Theme)) {
      updateTheme();
    }
    if (changedDependencies.some(dependency => dependencies.includes(dependency))) {
      const hasThemeNameChange = changedDependencies.includes(_specs.UnistyleDependency.ThemeName);
      updateRuntime(hasThemeNameChange);
    }
  });
  return () => dispose();
};
exports.listener = listener;
//# sourceMappingURL=listener.native.js.map