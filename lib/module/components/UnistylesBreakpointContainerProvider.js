"use strict";

import React, { useId, useLayoutEffect, useRef } from 'react';
import * as unistyles from '../web/services';
import { ContainerBreakpointContext, useContainerBreakpointStore } from '../context/ContainerBreakpointContext';
import { getBreakpointFromWidth } from './containerUtils';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ApplyContainerName = ({
  name
}) => {
  unistyles.services.shadowRegistry.setContainerName(name);
  useLayoutEffect(() => {
    unistyles.services.shadowRegistry.setContainerName(name);
  });
  return null;
};
export const UnistylesBreakpointContainerProvider = ({
  children,
  style
}) => {
  const uniqueId = useId();
  const containerName = useRef(`uni-cq-${uniqueId.replace(/:/g, '')}`).current;
  const previousContainerName = unistyles.services.shadowRegistry.getContainerName();
  const containerRef = useRef(null);
  const {
    store,
    emit
  } = useContainerBreakpointStore();
  const breakpoints = unistyles.services.runtime.breakpoints ?? {};
  useLayoutEffect(() => {
    unistyles.services.shadowRegistry.flush();
  });
  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const {
      width
    } = element.getBoundingClientRect();
    emit(getBreakpointFromWidth(width, breakpoints));
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      emit(getBreakpointFromWidth(entry.contentRect.width, breakpoints));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    containerType: 'inline-size',
    containerName,
    ...style
  };
  return /*#__PURE__*/_jsx(ContainerBreakpointContext.Provider, {
    value: store,
    children: /*#__PURE__*/_jsxs("div", {
      ref: containerRef,
      style: containerStyle,
      children: [/*#__PURE__*/_jsx(ApplyContainerName, {
        name: containerName
      }), children, /*#__PURE__*/_jsx(ApplyContainerName, {
        name: previousContainerName
      })]
    })
  });
};
//# sourceMappingURL=UnistylesBreakpointContainerProvider.js.map