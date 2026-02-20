"use strict";

import { getClassName } from '../core';
import { createUnistylesRef } from '../web/utils/createUnistylesRef';
export const getWebProps = (style, forwardedRef) => {
  const styles = getClassName(style);
  const ref = createUnistylesRef(styles, forwardedRef);
  const [generatedStyles] = styles ?? [];
  return {
    className: [generatedStyles?.hash, generatedStyles?.injectedClassName].filter(Boolean).join(' '),
    ref
  };
};
//# sourceMappingURL=getWebProps.js.map