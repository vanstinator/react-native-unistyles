"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMedia = void 0;
var _react = require("react");
var _utils = require("../utils");
const useMedia = config => {
  const disposeRef = (0, _react.useRef)(() => {});
  const [isVisible, setIsVisible] = (0, _react.useState)(() => {
    const maybeMq = config.mq;
    if (!(0, _utils.isUnistylesMq)(maybeMq)) {
      console.error(`🦄 Unistyles: Received invalid mq: ${maybeMq}`);
      return false;
    }
    const parsedMq = (0, _utils.parseMq)(maybeMq);
    if (!(0, _utils.isValidMq)(parsedMq)) {
      console.error(`🦄 Unistyles: Received invalid mq where min is greater than max: ${maybeMq}`);
      return false;
    }
    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight
    } = parsedMq;
    const mediaQuery = [minWidth !== undefined ? `(min-width: ${minWidth}px)` : undefined, maxWidth !== undefined ? `(max-width: ${maxWidth}px)` : undefined, minHeight !== undefined ? `(min-height: ${minHeight}px)` : undefined, maxHeight !== undefined ? `(max-height: ${maxHeight}px)` : undefined].filter(Boolean).join(' and ');
    const media = window.matchMedia(mediaQuery);
    const handler = event => setIsVisible(event.matches);
    media.addEventListener('change', handler);
    disposeRef.current = () => media.removeEventListener('change', handler);
    return media.matches;
  });

  // Unmount
  (0, _react.useEffect)(() => () => disposeRef.current(), []);
  return {
    isVisible
  };
};
exports.useMedia = useMedia;
//# sourceMappingURL=useMedia.js.map