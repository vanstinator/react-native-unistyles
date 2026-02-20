"use strict";

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ContainerQueryContext } from '../context/ContainerQueryContext';
import * as unistyles from '../web/services';
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
const ApplyContainerName = ({
  name
}) => {
  unistyles.services.shadowRegistry.setContainerName(name);
  return null;
};
export const ContainerQuery = ({
  children,
  style
}) => {
  const uniqueId = useId();
  const containerName = `uni-cq-${uniqueId.replace(/:/g, '')}`;
  const containerRef = useRef(null);
  const [dims, setDims] = useState(null);
  const breakpoints = unistyles.services.runtime.breakpoints ?? {};
  const previousContainerName = unistyles.services.shadowRegistry.getContainerName();
  const updateDimensions = useCallback((width, height) => {
    const breakpoint = getBreakpointFromWidth(width, breakpoints);
    setDims({
      width,
      height,
      breakpoint,
      containerName
    });
  }, [containerName]);
  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const {
        width,
        height
      } = entry.contentRect;
      updateDimensions(width, height);
    });
    observer.observe(element);
    const {
      width,
      height
    } = element.getBoundingClientRect();
    updateDimensions(width, height);
    return () => observer.disconnect();
  }, [updateDimensions]);
  const containerStyle = {
    containerType: 'inline-size',
    containerName,
    ...style
  };
  return /*#__PURE__*/_jsxs("div", {
    ref: containerRef,
    style: containerStyle,
    children: [/*#__PURE__*/_jsx(ApplyContainerName, {
      name: containerName
    }), /*#__PURE__*/_jsx(ContainerQueryContext.Provider, {
      value: dims,
      children: children
    }), /*#__PURE__*/_jsx(ApplyContainerName, {
      name: previousContainerName
    })]
  });
};
//# sourceMappingURL=ContainerQuery.js.map