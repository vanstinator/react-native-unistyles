"use strict";

import { StyleSheet as NativeStyleSheet, processColor } from 'react-native';
import { NitroModules } from 'react-native-nitro-modules';
import { parseBoxShadowString } from '../../core/parseBoxShadow';
const HybridUnistylesStyleSheet = NitroModules.createHybridObject('UnistylesStyleSheet');
HybridUnistylesStyleSheet.absoluteFillObject = NativeStyleSheet.absoluteFillObject;
HybridUnistylesStyleSheet.absoluteFill = NativeStyleSheet.absoluteFill;
HybridUnistylesStyleSheet.flatten = NativeStyleSheet.flatten;
HybridUnistylesStyleSheet.compose = NativeStyleSheet.compose;
HybridUnistylesStyleSheet.jsMethods = {
  processColor,
  parseBoxShadowString
};
HybridUnistylesStyleSheet.init();
export const StyleSheet = HybridUnistylesStyleSheet;
//# sourceMappingURL=index.js.map