"use strict";

import { StatusBar as NativeStatusBar } from 'react-native';
import { StatusBarStyle } from '../types';
export const attachStatusBarJSMethods = hybridObject => {
  hybridObject.setStyle = (style, animated) => {
    switch (style) {
      case StatusBarStyle.Light:
        return NativeStatusBar.setBarStyle('light-content', animated);
      case StatusBarStyle.Dark:
        return NativeStatusBar.setBarStyle('dark-content', animated);
      case StatusBarStyle.Default:
        return NativeStatusBar.setBarStyle('default', animated);
    }
  };
  const privateHybrid = hybridObject;
  hybridObject.setHidden = (isHidden, animation) => {
    NativeStatusBar.setHidden(isHidden, animation);
    privateHybrid.setHiddenNative(isHidden);
  };
};
//# sourceMappingURL=index.js.map