"use strict";

import { useMedia } from '../hooks';
export const Hide = ({
  children,
  ...props
}) => {
  const {
    isVisible
  } = useMedia(props);
  return !isVisible ? children : null;
};
//# sourceMappingURL=Hide.js.map