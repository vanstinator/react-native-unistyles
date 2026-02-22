"use strict";

import React from 'react';
import { copyComponentProperties } from '../utils';
import { isServer } from '../web/utils';
import { createUnistylesRef } from '../web/utils/createUnistylesRef';
import { getClassName } from './getClassname';
import { maybeWarnAboutMultipleUnistyles } from './warn';
import { jsx as _jsx } from "react/jsx-runtime";
const STYLE_PROPS = ['contentContainerStyle', 'columnWrapperStyle'];
const buildUnistylesProps = (Component, props, forwardedRef) => {
  const componentStyleProps = ['style', ...STYLE_PROPS.filter(styleProp => styleProp in props)];
  const classNames = Object.fromEntries(componentStyleProps.map(styleProp => [styleProp, getClassName(props[styleProp])]));
  const refs = componentStyleProps.map(styleProp => {
    return createUnistylesRef(classNames[styleProp], styleProp === 'style' ? forwardedRef : undefined);
  });
  componentStyleProps.forEach(styleProp => {
    maybeWarnAboutMultipleUnistyles(props[styleProp], Component.displayName);
  });
  return {
    ...classNames,
    ref: isServer() ? undefined : componentRef => refs.forEach(ref => ref?.(componentRef))
  };
};
export const createUnistylesElement = Component => {
  const UnistylesComponent = props => {
    return /*#__PURE__*/_jsx(Component, {
      ...props,
      ...buildUnistylesProps(Component, props, props.ref)
    });
  };
  return copyComponentProperties(Component, UnistylesComponent);
};
//# sourceMappingURL=createUnistylesElement.js.map