"use strict";

import React from 'react';
import { forwardRef } from 'react';
import { ImageBackground as NativeImageBackground } from 'react-native';
import { getClassName } from '../../core';
import { maybeWarnAboutMultipleUnistyles } from '../../core/warn';
import { copyComponentProperties } from '../../utils';
import { keyInObject } from '../../web/utils';
import { createUnistylesRef } from '../../web/utils/createUnistylesRef';
import { jsx as _jsx } from "react/jsx-runtime";
const UnistylesImageBackground = /*#__PURE__*/forwardRef((props, forwardedRef) => {
  const styleClassNames = getClassName(props.style);
  const imageClassNames = getClassName(props.imageStyle);
  const ref = createUnistylesRef(styleClassNames, forwardedRef);
  const imageRef = createUnistylesRef(imageClassNames);
  const hasWidthStyle = typeof props.imageStyle === 'object' && keyInObject(props.imageStyle, 'width');
  const hasHeightStyle = typeof props.imageStyle === 'object' && keyInObject(props.imageStyle, 'height');
  maybeWarnAboutMultipleUnistyles(props.style, 'ImageBackground');
  maybeWarnAboutMultipleUnistyles(props.imageStyle, 'ImageBackground');
  return /*#__PURE__*/_jsx(NativeImageBackground, {
    ...props,
    style: styleClassNames,
    imageStyle: [imageClassNames,
    // Clear inline width and height extracted from source
    hasWidthStyle && {
      width: ''
    }, hasHeightStyle && {
      height: ''
    }],
    ref: ref,
    imageRef: imageRef
  });
});
export const ImageBackground = copyComponentProperties(NativeImageBackground, UnistylesImageBackground);
//# sourceMappingURL=ImageBackground.js.map