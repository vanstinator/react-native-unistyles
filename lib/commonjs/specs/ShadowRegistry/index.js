"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnistylesShadowRegistry = void 0;
var _reactNativeNitroModules = require("react-native-nitro-modules");
const HybridShadowRegistry = _reactNativeNitroModules.NitroModules.createHybridObject('UnistylesShadowRegistry');
const findShadowNodeForHandle = handle => {
  const node = handle?.__internalInstanceHandle?.stateNode?.node ?? handle?.getScrollResponder?.()?.getNativeScrollRef?.()?.__internalInstanceHandle?.stateNode?.node ?? handle?.getNativeScrollRef?.()?.__internalInstanceHandle?.stateNode?.node ?? handle?._viewRef?.__internalInstanceHandle?.stateNode?.node ?? handle?.viewRef?.current?.__internalInstanceHandle?.stateNode?.node ?? handle?._nativeRef?.__internalInstanceHandle?.stateNode?.node;

  // @ts-ignore we don't know the type of handle
  if (!node && handle?.props?.horizontal && handle?.constructor?.name === 'FlatList') {
    throw new Error('Unistyles: detected an unsupported FlatList with the horizontal prop. This will cause crashes on Android due to a bug in React Native core. Read more: https://github.com/facebook/react-native/issues/51601');
  }
  if (!node) {
    throw new Error(`Unistyles: Could not find shadow node for one of your components of type ${handle?.constructor?.name ?? 'unknown'}`);
  }
  return node;
};
HybridShadowRegistry.add = (handle, styles) => {
  // virtualized nodes can be null
  if (!handle || !styles) {
    return;
  }
  const stylesArray = Array.isArray(styles) ? styles.flat() : [styles];

  // filter styles that are undefined or with no keys
  const filteredStyles = stylesArray.filter(style => style && Object.keys(style).length > 0).flat().filter(Boolean);
  if (filteredStyles.length > 0) {
    HybridShadowRegistry.link(findShadowNodeForHandle(handle), filteredStyles);
  }
};
HybridShadowRegistry.remove = handle => {
  if (!handle) {
    return;
  }
  HybridShadowRegistry.unlink(findShadowNodeForHandle(handle));
};
const UnistylesShadowRegistry = exports.UnistylesShadowRegistry = HybridShadowRegistry;
//# sourceMappingURL=index.js.map