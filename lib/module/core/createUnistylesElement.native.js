"use strict";

import React, { useRef } from 'react';
import { UnistylesShadowRegistry } from '../specs';
import { copyComponentProperties } from '../utils';
import { passForwardedRef } from './passForwardRef';
import { maybeWarnAboutMultipleUnistyles } from './warn';
import { jsx as _jsx } from "react/jsx-runtime";
export const createUnistylesElement = Component => {
  const UnistylesComponent = props => {
    const scrollViewRef = useRef(null);
    return /*#__PURE__*/_jsx(Component, {
      ...props,
      ref: ref => {
        maybeWarnAboutMultipleUnistyles(props.style, Component.displayName);

        // https://github.com/facebook/react-native/issues/51878
        // tested with ScrollView, REA ScrolLView and Animated ScrollView
        const isScrollView = Component.displayName === 'ScrollView';
        if (isScrollView && ref) {
          scrollViewRef.current = ref;
        }
        if (isScrollView && !ref) {
          // @ts-ignore this is hidden from TS
          UnistylesShadowRegistry.remove(scrollViewRef.current);
          scrollViewRef.current = null;
          return;
        }
        return passForwardedRef(ref, props.ref, () => {
          // @ts-ignore this is hidden from TS
          UnistylesShadowRegistry.add(ref, props.style);
        }, () => {
          // @ts-ignore this is hidden from TS
          UnistylesShadowRegistry.remove(ref);
        });
      }
    });
  };
  return copyComponentProperties(Component, UnistylesComponent);
};
//# sourceMappingURL=createUnistylesElement.native.js.map