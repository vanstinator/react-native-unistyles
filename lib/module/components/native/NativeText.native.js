"use strict";

import { createElement, forwardRef } from 'react';
import { createUnistylesElement } from '../../core';

// credits to @hirbod
const LeanText = /*#__PURE__*/forwardRef((props, ref) => {
  return /*#__PURE__*/createElement('RCTText', {
    ...props,
    ref
  });
});
LeanText.displayName = 'RCTText';
export const NativeText = createUnistylesElement(LeanText);
//# sourceMappingURL=NativeText.native.js.map