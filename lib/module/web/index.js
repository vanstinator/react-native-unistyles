"use strict";

import { StyleSheet as RNStyleSheet } from 'react-native';
import { create } from './create';
import * as unistyles from './services';
export const StyleSheet = {
  configure: unistyles.services.state.init,
  create: create,
  absoluteFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  absoluteFillObject: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  compose: (a, b) => RNStyleSheet.compose(a, b),
  flatten: (...styles) => RNStyleSheet.flatten(...styles),
  hairlineWidth: 1
};
export const UnistylesRuntime = unistyles.services.runtime;
export const UnistylesShadowRegistry = unistyles.services.shadowRegistry;
export * from './mock';
//# sourceMappingURL=index.js.map