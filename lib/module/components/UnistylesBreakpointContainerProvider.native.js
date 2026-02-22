"use strict";

import React, { useLayoutEffect, useRef } from 'react';
import { View } from 'react-native';
import { UnistylesRuntime, UnistylesShadowRegistry } from '../specs';
import { ContainerBreakpointContext, useContainerBreakpointStore } from '../context/ContainerBreakpointContext';
import { ApplyContainerBreakpoint } from './ApplyContainerBreakpoint';
import { getBreakpointFromWidth } from './containerUtils';
import { jsx as _jsx } from "react/jsx-runtime";
let nextContainerId = 0;
export const UnistylesBreakpointContainerProvider = ({
  children,
  onLayout,
  ...props
}) => {
  const containerIdRef = useRef(++nextContainerId);
  const containerId = containerIdRef.current;
  const previousContainerId = UnistylesShadowRegistry.getContainerBreakpointId();
  const {
    store,
    emit
  } = useContainerBreakpointStore();
  useLayoutEffect(() => {
    UnistylesShadowRegistry.flush();
  });
  const mappedChildren = [/*#__PURE__*/_jsx(ApplyContainerBreakpoint, {
    containerId: containerId
  }, "apply"), children, /*#__PURE__*/_jsx(ApplyContainerBreakpoint, {
    containerId: previousContainerId
  }, "dispose")];
  return /*#__PURE__*/_jsx(ContainerBreakpointContext.Provider, {
    value: store,
    children: /*#__PURE__*/_jsx(View, {
      onLayout: e => {
        const {
          width,
          height
        } = e.nativeEvent.layout;
        UnistylesShadowRegistry.updateContainerSize(containerId, width, height);
        emit(getBreakpointFromWidth(width, UnistylesRuntime.breakpoints));
        onLayout?.(e);
      },
      ...props,
      children: mappedChildren
    })
  });
};
//# sourceMappingURL=UnistylesBreakpointContainerProvider.native.js.map