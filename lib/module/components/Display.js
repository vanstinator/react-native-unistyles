"use strict";

import { useMedia } from '../hooks';
export const Display = ({
  children,
  ...props
}) => {
  const {
    isVisible
  } = useMedia(props);
  return isVisible ? children : null;
};
//# sourceMappingURL=Display.js.map