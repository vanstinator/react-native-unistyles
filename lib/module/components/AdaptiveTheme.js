"use strict";

import React, { useLayoutEffect } from 'react';
import { useUnistyles } from '../core';
import { UnistylesShadowRegistry } from '../specs';
import { ApplyScopedTheme } from './ApplyScopedTheme';
import { jsx as _jsx } from "react/jsx-runtime";
export const AdaptiveTheme = ({
  children,
  previousScopedTheme
}) => {
  const {
    rt
  } = useUnistyles();
  const name = rt.colorScheme === 'dark' ? 'light' : 'dark';
  const mappedChildren = [/*#__PURE__*/_jsx(ApplyScopedTheme, {
    name: name
  }, name), children, /*#__PURE__*/_jsx(ApplyScopedTheme, {
    name: previousScopedTheme
  }, 'dispose')];
  useLayoutEffect(() => {
    // this will affect only scoped styles as other styles are not yet mounted
    UnistylesShadowRegistry.flush();
  });
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: mappedChildren
  }, name);
};
//# sourceMappingURL=AdaptiveTheme.js.map