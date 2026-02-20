"use strict";

import { useLayoutEffect } from 'react';
import { UnistylesShadowRegistry } from '../specs';
export const ApplyContainerDimensions = ({
  dimensions
}) => {
  // @ts-expect-error - this is hidden from TS
  UnistylesShadowRegistry.setContainerDimensions(dimensions);
  useLayoutEffect(() => {
    // @ts-expect-error - this is hidden from TS
    UnistylesShadowRegistry.setContainerDimensions(dimensions);
  });
  return null;
};
//# sourceMappingURL=ApplyContainerDimensions.js.map