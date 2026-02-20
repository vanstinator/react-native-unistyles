"use strict";

import React, { forwardRef } from 'react';
import { Pressable as NativePressableReactNative } from 'react-native';
import { getClassName } from '../../core';
import { UnistylesShadowRegistry } from '../../specs';
import { isServer } from '../../web/utils';
import { jsx as _jsx } from "react/jsx-runtime";
export const Pressable = /*#__PURE__*/forwardRef(({
  style,
  ...props
}, forwardedRef) => {
  const scopedTheme = UnistylesShadowRegistry.getScopedTheme();
  let storedRef = null;
  let classNames = undefined;
  return /*#__PURE__*/_jsx(NativePressableReactNative, {
    ...props,
    ref: isServer() ? undefined : ref => {
      storedRef = ref;
      // @ts-expect-error hidden from TS
      UnistylesShadowRegistry.add(storedRef, classNames?.hash);
      if (typeof forwardedRef === 'function') {
        return forwardedRef(ref);
      }
      if (forwardedRef) {
        forwardedRef.current = ref;
      }
    },
    style: state => {
      const styleResult = typeof style === 'function' ? style(state) : style;
      const previousScopedTheme = UnistylesShadowRegistry.getScopedTheme();
      UnistylesShadowRegistry.setScopedTheme(scopedTheme);

      // @ts-expect-error hidden from TS
      UnistylesShadowRegistry.remove(storedRef, classNames?.hash);
      classNames = getClassName(styleResult);
      // @ts-expect-error hidden from TS
      UnistylesShadowRegistry.add(storedRef, classNames?.hash);
      UnistylesShadowRegistry.setScopedTheme(previousScopedTheme);
      return classNames;
    }
  });
});
//# sourceMappingURL=Pressable.js.map