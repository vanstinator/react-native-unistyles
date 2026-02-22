"use strict";

import React, { forwardRef, useEffect, useRef } from 'react';
import { UnistylesShadowRegistry } from '../../specs';
import { deepMergeObjects } from '../../utils';
import { useProxifiedUnistyles } from '../useProxifiedUnistyles';
import { maybeWarnAboutMultipleUnistyles } from '../warn';

// @ts-expect-error

// @ts-expect-error
import { jsx as _jsx } from "react/jsx-runtime";
export const withUnistyles = (Component, mappings) => {
  const getSecrets = (styleProps = {}) => {
    const styles = Array.isArray(styleProps) ? styleProps.flat() : [styleProps];
    const secrets = styles.filter(Boolean).reduce((acc, style) => {
      const unistyleKey = Object.keys(style).find(key => key.startsWith('unistyles_'));
      return acc.concat([unistyleKey ? style[unistyleKey] : {
        uni__getStyles: () => style,
        uni__dependencies: []
      }]);
    }, []);
    return {
      styles: secrets.reduce((acc, secret) => Object.assign(acc, secret.uni__getStyles()), {}),
      dependencies: secrets.flatMap(secret => secret.uni__dependencies)
    };
  };
  return /*#__PURE__*/forwardRef((props, ref) => {
    const narrowedProps = props;
    const NativeComponent = Component;

    // @ts-ignore we don't know the type of the component
    maybeWarnAboutMultipleUnistyles(narrowedProps.style, `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`);
    // @ts-ignore we don't know the type of the component
    maybeWarnAboutMultipleUnistyles(narrowedProps.contentContainerStyle, `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`);
    const scopedTheme = useRef(UnistylesShadowRegistry.getScopedTheme());
    const {
      proxifiedRuntime,
      proxifiedTheme,
      addDependencies
    } = useProxifiedUnistyles(scopedTheme.current);
    useEffect(() => {
      const styleSecrets = getSecrets(narrowedProps.style);
      const contentContainerStyleSecrets = getSecrets(narrowedProps.contentContainerStyle);
      addDependencies(Array.from(new Set([...styleSecrets.dependencies, ...contentContainerStyleSecrets.dependencies])));
    }, [narrowedProps.style, narrowedProps.contentContainerStyle]);
    const {
      key: mappingsKey,
      ...mappingsProps
    } = mappings ? mappings(proxifiedTheme, proxifiedRuntime) : {};
    const {
      key: uniPropsKey,
      ...unistyleProps
    } = narrowedProps.uniProps ? narrowedProps.uniProps(proxifiedTheme, proxifiedRuntime) : {};
    const styleSecrets = getSecrets(narrowedProps.style);
    const contentContainerStyleSecrets = getSecrets(narrowedProps.contentContainerStyle);
    const finalProps = {
      ...deepMergeObjects(mappingsProps, unistyleProps, props),
      ...(narrowedProps.style ? {
        style: styleSecrets.styles
      } : {}),
      ...(narrowedProps.contentContainerStyle ? {
        contentContainerStyle: contentContainerStyleSecrets.styles
      } : {})
    };
    return /*#__PURE__*/_jsx(NativeComponent, {
      ...finalProps,
      ref: ref
    }, uniPropsKey || mappingsKey);
  });
};
//# sourceMappingURL=withUnistyles.native.js.map