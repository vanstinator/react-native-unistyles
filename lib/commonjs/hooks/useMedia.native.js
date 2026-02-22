"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMedia = void 0;
var _react = require("react");
var _specs = require("../specs");
var _utils = require("../utils");
const useMedia = config => {
  const computeIsVisible = () => {
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
      width,
      height
    } = _specs.UnistylesRuntime.screen;
    if (parsedMq.minWidth !== undefined && width < parsedMq.minWidth) {
      return false;
    }
    if (parsedMq.maxWidth !== undefined && width > parsedMq.maxWidth) {
      return false;
    }
    if (parsedMq.minHeight !== undefined && height < parsedMq.minHeight) {
      return false;
    }
    if (parsedMq.maxHeight !== undefined && height > parsedMq.maxHeight) {
      return false;
    }
    return true;
  };
  const [isVisible, setIsVisible] = (0, _react.useState)(computeIsVisible());
  (0, _react.useEffect)(() => {
    setIsVisible(computeIsVisible());
  }, [config.mq]);
  (0, _react.useLayoutEffect)(() => {
    // @ts-expect-error - this is hidden from TS
    const removeChangeListener = _specs.StyleSheet.addChangeListener(dependencies => {
      if (dependencies.includes(_specs.UnistyleDependency.Breakpoints)) {
        setIsVisible(computeIsVisible());
      }
    });
    return () => {
      removeChangeListener();
    };
  }, [config.mq]);
  return {
    isVisible
  };
};
exports.useMedia = useMedia;
//# sourceMappingURL=useMedia.native.js.map