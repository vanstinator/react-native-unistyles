"use strict";

import { useEffect, useLayoutEffect } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { StyleSheet, UnistyleDependency } from '../../specs';
export const useUpdateVariantColor = ({
  colorKey,
  style,
  secretKey
}) => {
  const fromValue = useSharedValue(style[colorKey]);
  const toValue = useSharedValue(style[colorKey]);
  useEffect(() => {
    // @ts-ignore this is hidden from TS
    const dispose = StyleSheet.addChangeListener(changedDependencies => {
      if (changedDependencies.includes(UnistyleDependency.Theme) || changedDependencies.includes(UnistyleDependency.Breakpoints)) {
        // @ts-ignore
        const newStyles = style[secretKey]?.uni__getStyles();
        fromValue.set(toValue.value);
        toValue.set(newStyles[colorKey]);
      }
    });
    return () => dispose();
  }, [style, colorKey]);
  useLayoutEffect(() => {
    fromValue.set(toValue.value);
    toValue.set(style[colorKey]);
  }, [style, colorKey]);
  return {
    fromValue,
    toValue
  };
};
//# sourceMappingURL=useUpdateVariantColor.native.js.map