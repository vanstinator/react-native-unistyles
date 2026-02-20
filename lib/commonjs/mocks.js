"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
jest.mock('react-native-nitro-modules', () => ({
  NitroModules: {
    createHybridObject: () => ({
      add: () => {},
      init: () => {},
      createHybridStatusBar: () => ({
        setStyle: () => {}
      }),
      createHybridNavigationBar: () => {}
    })
  }
}));
jest.mock('react-native-unistyles', () => {
  const React = require('react');
  const _REGISTRY = {
    themes: {},
    breakpoints: {}
  };
  const miniRuntime = {
    themeName: undefined,
    breakpoint: undefined,
    hasAdaptiveThemes: false,
    colorScheme: 'unspecified',
    contentSizeCategory: 'Medium',
    insets: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      ime: 0
    },
    pixelRatio: 1,
    fontScale: 1,
    rtl: false,
    isLandscape: false,
    isPortrait: true,
    navigationBar: {
      width: 0,
      height: 0
    },
    screen: {
      width: 0,
      height: 0
    },
    statusBar: {
      width: 0,
      height: 0
    }
  };
  const unistylesRuntime = {
    colorScheme: 'unspecified',
    contentSizeCategory: 'Medium',
    orientation: 'portrait',
    isPortrait: true,
    isLandscape: false,
    breakpoints: {},
    dispose: () => {},
    equals: () => false,
    name: 'UnistylesRuntimeMock',
    miniRuntime: miniRuntime,
    statusBar: {
      height: 0,
      width: 0,
      name: 'StatusBarMock',
      equals: () => false,
      setHidden: () => {},
      setStyle: () => {}
    },
    navigationBar: {
      height: 0,
      width: 0,
      name: 'NavigationBarMock',
      equals: () => false,
      setHidden: () => {},
      dispose: () => {}
    },
    fontScale: 1,
    hasAdaptiveThemes: false,
    pixelRatio: 0,
    rtl: false,
    getTheme: () => {
      return Object.values(_REGISTRY.themes).at(0) ?? {};
    },
    setTheme: () => {},
    updateTheme: () => {},
    setRootViewBackgroundColor: () => {},
    nativeSetRootViewBackgroundColor: () => {},
    createHybridStatusBar: () => {
      return {};
    },
    createHybridNavigationBar: () => {
      return {};
    },
    setAdaptiveThemes: () => {},
    setImmersiveMode: () => {},
    setImmersiveModeNative: () => {},
    insets: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      ime: 0
    },
    screen: {
      width: 0,
      height: 0
    },
    breakpoint: undefined
  };
  return {
    Hide: () => null,
    Display: () => null,
    ScopedTheme: () => null,
    ContainerQuery: ({
      children
    }) => children,
    useContainerDimensions: () => null,
    withUnistyles: (Component, mapper) => props => React.createElement(Component, {
      ...mapper?.(Object.values(_REGISTRY.themes).at(0) ?? {}, miniRuntime),
      ...props
    }),
    mq: {
      only: {
        width: () => ({
          and: {
            height: () => ({})
          }
        }),
        height: () => ({
          and: {
            width: () => ({})
          }
        })
      },
      width: () => ({
        and: {
          height: () => ({})
        }
      }),
      height: () => ({
        and: {
          width: () => ({})
        }
      })
    },
    useUnistyles: () => ({
      theme: Object.values(_REGISTRY.themes).at(0) ?? {},
      rt: unistylesRuntime
    }),
    StyleSheet: {
      absoluteFillObject: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      absoluteFill: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      compose: styles => {
        return styles;
      },
      flatten: styles => {
        return styles;
      },
      create: styles => {
        if (typeof styles === 'function') {
          return {
            ...styles(Object.values(_REGISTRY.themes).at(0) ?? {}, miniRuntime),
            useVariants: () => {}
          };
        }
        return {
          ...styles,
          useVariants: () => {}
        };
      },
      configure: config => {
        if (config.breakpoints) {
          _REGISTRY.breakpoints = config.breakpoints;
        }
        if (config.themes) {
          _REGISTRY.themes = config.themes;
        }
      },
      jsMethods: {
        processColor: () => null,
        parseBoxShadowString: () => []
      },
      hairlineWidth: 1,
      unid: -1,
      addChangeListener: () => () => {},
      init: () => {},
      name: 'StyleSheetMock',
      dispose: () => {},
      equals: () => false
    },
    UnistylesRuntime: unistylesRuntime
  };
});
jest.mock('react-native-unistyles/reanimated', () => {
  const unistyles = require('react-native-unistyles');
  const mockedSharedValue = value => ({
    get: () => value,
    set: _value => {},
    value
  });
  return {
    useAnimatedTheme: () => {
      const theme = unistyles.useUnistyles().theme;
      const sharedTheme = mockedSharedValue(theme);
      return sharedTheme;
    },
    useAnimatedVariantColor: () => {
      const fromValue = mockedSharedValue('#000000');
      const toValue = mockedSharedValue('#FFFFFF');
      return {
        fromValue,
        toValue
      };
    }
  };
});
//# sourceMappingURL=mocks.js.map