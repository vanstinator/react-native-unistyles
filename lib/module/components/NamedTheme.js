"use strict";

import React, { useLayoutEffect } from 'react';
import { UnistylesShadowRegistry } from '../specs';
import { ApplyScopedTheme } from './ApplyScopedTheme';
import { jsx as _jsx } from "react/jsx-runtime";
export const NamedTheme = ({
  name,
  children,
  previousScopedTheme
}) => {
  const mappedChildren = [/*#__PURE__*/_jsx(ApplyScopedTheme, {
    name: name
  }, 'apply'), children, /*#__PURE__*/_jsx(ApplyScopedTheme, {
    name: previousScopedTheme
  }, 'dispose')];
  useLayoutEffect(() => {
    // this will affect only scoped styles as other styles are not yet mounted
    UnistylesShadowRegistry.flush();
  });
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: mappedChildren
  });
};
//# sourceMappingURL=NamedTheme.js.map