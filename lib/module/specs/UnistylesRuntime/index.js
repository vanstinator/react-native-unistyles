"use strict";

import { processColor } from 'react-native';
import { NitroModules } from 'react-native-nitro-modules';
import { isAndroid, isIOS } from '../../common';
import { attachStatusBarJSMethods } from '../StatusBar';
const HybridUnistylesRuntime = NitroModules.createHybridObject('UnistylesRuntime');
HybridUnistylesRuntime.statusBar = HybridUnistylesRuntime.createHybridStatusBar();
HybridUnistylesRuntime.navigationBar = HybridUnistylesRuntime.createHybridNavigationBar();
HybridUnistylesRuntime.setRootViewBackgroundColor = color => {
  const parsedColor = processColor(color) ?? 0;
  HybridUnistylesRuntime.nativeSetRootViewBackgroundColor(parsedColor);
};
if (isIOS) {
  HybridUnistylesRuntime.setImmersiveMode = isEnabled => HybridUnistylesRuntime.statusBar.setHidden(isEnabled, 'fade');
}
if (isAndroid) {
  HybridUnistylesRuntime.setImmersiveMode = HybridUnistylesRuntime.setImmersiveModeNative;
}
attachStatusBarJSMethods(HybridUnistylesRuntime.statusBar);
export const Runtime = HybridUnistylesRuntime;
//# sourceMappingURL=index.js.map