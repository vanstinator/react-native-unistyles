"use strict";

import { useContainerBreakpoint } from '../context/ContainerBreakpointContext';
import { useProxifiedUnistyles } from './useProxifiedUnistyles';
export const useUnistyles = () => {
  const {
    proxifiedRuntime,
    proxifiedTheme
  } = useProxifiedUnistyles();
  const containerBreakpoint = useContainerBreakpoint();
  return {
    theme: proxifiedTheme,
    rt: proxifiedRuntime,
    containerBreakpoint
  };
};
//# sourceMappingURL=useUnistyles.js.map