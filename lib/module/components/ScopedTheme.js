"use strict";

import React from 'react';
import { UnistylesRuntime, UnistylesShadowRegistry } from '../specs';
import { AdaptiveTheme } from './AdaptiveTheme';
import { NamedTheme } from './NamedTheme';
import { jsx as _jsx } from "react/jsx-runtime";
export const ScopedTheme = ({
  name,
  children,
  invertedAdaptive,
  reset
}) => {
  const hasAdaptiveThemes = UnistylesRuntime.hasAdaptiveThemes;
  const isAdaptiveTheme = invertedAdaptive && hasAdaptiveThemes;
  const previousScopedTheme = UnistylesShadowRegistry.getScopedTheme();
  switch (true) {
    case name !== undefined:
      return /*#__PURE__*/_jsx(NamedTheme, {
        name: name,
        previousScopedTheme: previousScopedTheme,
        children: children
      });
    case isAdaptiveTheme:
      return /*#__PURE__*/_jsx(AdaptiveTheme, {
        previousScopedTheme: previousScopedTheme,
        children: children
      });
    case reset:
      return /*#__PURE__*/_jsx(NamedTheme, {
        name: undefined,
        previousScopedTheme: previousScopedTheme,
        children: children
      });
    default:
      return children;
  }
};
//# sourceMappingURL=ScopedTheme.js.map