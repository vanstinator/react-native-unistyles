"use strict";

import React from 'react';
import { StyleSheet } from 'react-native';
import * as unistyles from '../web/services';
import { error, isServer } from '../web/utils';
import { serialize } from './serialize';
import { DefaultServerUnistylesSettings } from './types';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export const getServerUnistyles = ({
  includeRNWStyles = true
} = DefaultServerUnistylesSettings) => {
  if (!isServer()) {
    throw error('Server styles should only be read on the server');
  }

  // @ts-ignore
  const rnwStyle = includeRNWStyles ? StyleSheet?.getSheet().textContent ?? '' : null;
  const css = unistyles.services.registry.css.getStyles();
  const state = unistyles.services.registry.css.getState();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [rnwStyle && /*#__PURE__*/_jsx("style", {
      id: "rnw-style",
      children: rnwStyle
    }), /*#__PURE__*/_jsx("style", {
      id: "unistyles-web",
      children: css
    }), /*#__PURE__*/_jsx("script", {
      id: "unistyles-script",
      defer: true,
      dangerouslySetInnerHTML: {
        __html: `window.__UNISTYLES_STATE__ = ${serialize(state)}`
      }
    })]
  });
};
//# sourceMappingURL=getServerUnistyles.js.map