"use strict";

import React, { forwardRef } from 'react';
import { deepMergeObjects } from '../../utils';
import { getClassName } from '../getClassname';
import { useProxifiedUnistyles } from '../useProxifiedUnistyles';
import { maybeWarnAboutMultipleUnistyles } from '../warn';

// @ts-expect-error

// @ts-expect-error
import { jsx as _jsx } from "react/jsx-runtime";
export const withUnistyles = (Component, mappings) => {
  return /*#__PURE__*/forwardRef((props, ref) => {
    const narrowedProps = props;
    const styleClassNames = getClassName(narrowedProps.style, true);
    const contentContainerStyleClassNames = getClassName(narrowedProps.contentContainerStyle);
    const {
      proxifiedRuntime,
      proxifiedTheme
    } = useProxifiedUnistyles();
    const {
      key: mappingsKey,
      ...mappingsProps
    } = mappings ? mappings(proxifiedTheme, proxifiedRuntime) : {};
    const {
      key: uniPropsKey,
      ...unistyleProps
    } = narrowedProps.uniProps ? narrowedProps.uniProps(proxifiedTheme, proxifiedRuntime) : {};
    const emptyStyles = narrowedProps.style ? Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(narrowedProps.style)).filter(([key]) => !key.startsWith("unistyles") && !key.startsWith("_")).map(([key]) => [key, undefined])) : undefined;
    const combinedProps = {
      ...deepMergeObjects(mappingsProps, unistyleProps, props),
      ...(narrowedProps.style ? {
        // Override default component styles with undefined values to reset them
        style: emptyStyles
      } : {}),
      ...(narrowedProps.contentContainerStyle ? {
        contentContainerStyle: contentContainerStyleClassNames
      } : {})
    };

    // @ts-ignore
    maybeWarnAboutMultipleUnistyles(narrowedProps.style, `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`);
    // @ts-ignore
    maybeWarnAboutMultipleUnistyles(narrowedProps.contentContainerStyle, `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`);
    const NativeComponent = Component;
    const [classNames] = styleClassNames ?? [];
    return /*#__PURE__*/_jsx("div", {
      className: classNames?.hash,
      style: {
        display: 'contents'
      },
      children: /*#__PURE__*/_jsx(NativeComponent, {
        ...combinedProps,
        ref: ref
      }, uniPropsKey || mappingsKey)
    });
  });
};
//# sourceMappingURL=withUnistyles.js.map