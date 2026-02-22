"use strict";

import { useLayoutEffect } from 'react';
import { UnistylesShadowRegistry } from '../specs';
export const ApplyScopedTheme = ({
  name
}) => {
  UnistylesShadowRegistry.setScopedTheme(name);
  useLayoutEffect(() => {
    UnistylesShadowRegistry.setScopedTheme(name);
  });
  return null;
};
//# sourceMappingURL=ApplyScopedTheme.js.map