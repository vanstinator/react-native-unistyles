"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passForwardedRef = void 0;
const passForwardedRef = (ref, forwardedRef, onMount, onUnmount) => {
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
exports.passForwardedRef = passForwardedRef;
//# sourceMappingURL=passForwardRef.js.map