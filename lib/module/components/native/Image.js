"use strict";

import React, { forwardRef } from 'react';
import { Image as NativeImage } from 'react-native';
import { getClassName } from '../../core';
import { maybeWarnAboutMultipleUnistyles } from '../../core/warn';
import { copyComponentProperties } from '../../utils';
import { checkForProp } from '../../web/utils';
import { createUnistylesRef } from '../../web/utils/createUnistylesRef';
import { jsx as _jsx } from "react/jsx-runtime";
const UnistylesImage = /*#__PURE__*/forwardRef((props, forwardedRef) => {
  const classNames = getClassName(props.style);
  const ref = createUnistylesRef(classNames, forwardedRef);
  const hasWidthStyle = checkForProp(props.style, 'width');
  const hasHeightStyle = checkForProp(props.style, 'height');
  maybeWarnAboutMultipleUnistyles(props.style, 'Image');
  return /*#__PURE__*/_jsx(NativeImage, {
    ...props,
    style: [classNames,
    // Clear inline width and height extracted from source
    hasWidthStyle && {
      width: ''
    }, hasHeightStyle && {
      height: ''
    }],
    ref: ref
  });
});
export const Image = copyComponentProperties(NativeImage, UnistylesImage);
//# sourceMappingURL=Image.js.map