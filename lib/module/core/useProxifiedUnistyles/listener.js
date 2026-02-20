"use strict";

import { UnistyleDependency } from '../../specs';
import * as unistyles from '../../web/services';
export const listener = ({
  dependencies,
  updateTheme,
  updateRuntime
}) => {
  const disposeTheme = unistyles.services.listener.addListeners(dependencies.filter(dependency => dependency === UnistyleDependency.Theme), updateTheme);
  const disposeRuntime = unistyles.services.listener.addListeners(dependencies.filter(dependency => dependency !== UnistyleDependency.Theme), dependency => updateRuntime(dependency === UnistyleDependency.ThemeName));
  return () => {
    disposeTheme();
    disposeRuntime();
  };
};
//# sourceMappingURL=listener.js.map