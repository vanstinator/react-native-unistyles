"use strict";

import { createElement, forwardRef } from 'react';
import { createUnistylesElement } from '../../core';

// credits to @hirbod
const LeanView = /*#__PURE__*/forwardRef((props, ref) => {
  return /*#__PURE__*/createElement('RCTView', {
    ...props,
    ref
  });
});
LeanView.displayName = 'RCTView';

// this will match default export from react-native
export default createUnistylesElement(LeanView);
//# sourceMappingURL=NativeView.native.js.map