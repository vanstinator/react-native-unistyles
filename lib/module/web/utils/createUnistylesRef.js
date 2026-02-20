"use strict";

import * as unistyles from '../services';
import { isServer } from './common';
export const createUnistylesRef = (styles, forwardedRef) => {
  const storedRef = {
    current: null
  };
  const [classNames] = styles ?? [];
  return isServer() ? undefined : ref => {
    if (!ref) {
      unistyles.services.shadowRegistry.remove(storedRef, classNames?.hash);
    }
    storedRef.current = ref;
    unistyles.services.shadowRegistry.add(ref, classNames?.hash);
    if (typeof forwardedRef === 'function') {
      return forwardedRef(ref);
    }
    if (forwardedRef) {
      forwardedRef.current = ref;
    }
  };
};
//# sourceMappingURL=createUnistylesRef.js.map