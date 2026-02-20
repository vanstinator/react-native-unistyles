"use strict";

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ContainerQueryContext } from '../context/ContainerQueryContext';
import { UnistylesRuntime, UnistylesShadowRegistry } from '../specs';
import { ApplyContainerDimensions } from './ApplyContainerDimensions';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function getBreakpointFromWidth(width, breakpoints) {
  const sorted = Object.entries(breakpoints).filter(pair => pair[1] !== undefined).sort(([, a], [, b]) => a - b);
  if (sorted.length === 0) {
    return undefined;
  }
  const idx = sorted.findIndex(([, value]) => width < value);
  if (idx <= 0) {
    return sorted[0]?.[0];
  }
  return sorted[idx - 1][0];
}
export const ContainerQuery = ({
  children,
  style
}) => {
  const [dims, setDims] = useState(null);
  const previousContainerDims = useRef(
  // @ts-expect-error - this is hidden from TS
  UnistylesShadowRegistry.getContainerDimensions());
  const breakpoints = UnistylesRuntime.breakpoints ?? {};
  const onLayout = useCallback(event => {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    const breakpoint = getBreakpointFromWidth(width, breakpoints);
    setDims({
      width,
      height,
      breakpoint
    });
  }, []);
  useLayoutEffect(() => {
    // @ts-expect-error - this is hidden from TS
    UnistylesShadowRegistry.flush();
  });
  return /*#__PURE__*/_jsxs(View, {
    style: style,
    onLayout: onLayout,
    collapsable: false,
    children: [/*#__PURE__*/_jsx(ApplyContainerDimensions, {
      dimensions: dims ?? undefined
    }), /*#__PURE__*/_jsx(ContainerQueryContext.Provider, {
      value: dims,
      children: children
    }), /*#__PURE__*/_jsx(ApplyContainerDimensions, {
      dimensions: previousContainerDims.current
    })]
  });
};
//# sourceMappingURL=ContainerQuery.native.js.map