"use strict";

import { createContext, useContext, useRef, useSyncExternalStore } from 'react';
export const ContainerBreakpointContext = /*#__PURE__*/createContext(null);
export const useContainerBreakpointStore = () => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    const listeners = new Set();
    let currentBreakpoint = undefined;
    storeRef.current = {
      store: {
        subscribe: callback => {
          listeners.add(callback);
          return () => listeners.delete(callback);
        },
        getSnapshot: () => currentBreakpoint
      },
      emit: breakpoint => {
        if (currentBreakpoint === breakpoint) {
          return;
        }
        currentBreakpoint = breakpoint;
        listeners.forEach(listener => listener());
      }
    };
  }
  return storeRef.current;
};
export const useContainerBreakpoint = () => {
  const store = useContext(ContainerBreakpointContext);
  return useSyncExternalStore(store?.subscribe ?? emptySubscribe, store?.getSnapshot ?? emptySnapshot);
};
const emptySubscribe = _cb => () => {};
const emptySnapshot = () => undefined;
//# sourceMappingURL=ContainerBreakpointContext.js.map