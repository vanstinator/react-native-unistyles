"use strict";

import { useLayoutEffect } from 'react';
import { UnistylesShadowRegistry } from '../specs';
export const ApplyContainerBreakpoint = ({
  containerId
}) => {
  UnistylesShadowRegistry.setContainerBreakpointId(containerId);
  useLayoutEffect(() => {
    UnistylesShadowRegistry.setContainerBreakpointId(containerId);
  });
  return null;
};
//# sourceMappingURL=ApplyContainerBreakpoint.js.map