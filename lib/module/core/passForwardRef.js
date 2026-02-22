"use strict";

export const passForwardedRef = (ref, forwardedRef, onMount, onUnmount) => {
  const passForwardedRef = () => {
    if (typeof forwardedRef === 'function') {
      return forwardedRef(ref);
    }
    if (forwardedRef) {
      forwardedRef.current = ref;
    }
    return () => {};
  };
  const forwardedRefReturnFn = passForwardedRef();
  onMount?.();
  return () => {
    forwardedRefReturnFn?.();
    onUnmount?.();
  };
};
//# sourceMappingURL=passForwardRef.js.map