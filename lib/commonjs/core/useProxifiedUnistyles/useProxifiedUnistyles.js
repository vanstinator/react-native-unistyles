"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProxifiedUnistyles = void 0;
var _react = require("react");
var _specs = require("../../specs");
var _NativePlatform = require("../../specs/NativePlatform");
var _listener = require("./listener");
// It's imported that way because of circular dependency

const getMiniRuntime = () => {
  // @ts-expect-error This is hidden from TS
  return _specs.UnistylesRuntime.miniRuntime;
};
const RTDependencyMap = {
  breakpoint: _NativePlatform.UnistyleDependency.Breakpoints,
  colorScheme: _NativePlatform.UnistyleDependency.ColorScheme,
  contentSizeCategory: _NativePlatform.UnistyleDependency.ContentSizeCategory,
  hasAdaptiveThemes: _NativePlatform.UnistyleDependency.AdaptiveThemes,
  insets: _NativePlatform.UnistyleDependency.Insets,
  fontScale: _NativePlatform.UnistyleDependency.FontScale,
  isLandscape: _NativePlatform.UnistyleDependency.Orientation,
  isPortrait: _NativePlatform.UnistyleDependency.Orientation,
  navigationBar: _NativePlatform.UnistyleDependency.NavigationBar,
  screen: _NativePlatform.UnistyleDependency.Dimensions,
  statusBar: _NativePlatform.UnistyleDependency.StatusBar,
  pixelRatio: _NativePlatform.UnistyleDependency.PixelRatio,
  themeName: _NativePlatform.UnistyleDependency.ThemeName,
  rtl: _NativePlatform.UnistyleDependency.Rtl
};
const useProxifiedUnistyles = forcedTheme => {
  const [scopedTheme, setScopedTheme] = (0, _react.useState)(forcedTheme ?? _specs.UnistylesShadowRegistry.getScopedTheme());
  const [dependencies] = (0, _react.useState)(() => new Set());
  const [theme, setTheme] = (0, _react.useState)(_specs.UnistylesRuntime.getTheme(scopedTheme));
  const [_, runtimeChanged] = (0, _react.useReducer)(() => ({}), {});
  const disposeRef = (0, _react.useRef)(undefined);
  const syncedDependenciesSizeRef = (0, _react.useRef)(-1);
  const syncedScopedThemeRef = (0, _react.useRef)(undefined);
  const reinitListener = () => {
    disposeRef.current?.();
    disposeRef.current = (0, _listener.listener)({
      dependencies: Array.from(dependencies),
      updateTheme: () => {
        if (scopedTheme) {
          return;
        }
        setTheme(_specs.UnistylesRuntime.getTheme(scopedTheme));
      },
      updateRuntime: hasThemeNameChange => {
        if (hasThemeNameChange && scopedTheme) {
          return;
        }
        runtimeChanged();
      }
    });
  };
  (0, _react.useEffect)(() => {
    return () => disposeRef.current?.();
  }, [disposeRef]);
  const maybeNewScopedTheme = _specs.UnistylesShadowRegistry.getScopedTheme();
  if (scopedTheme && maybeNewScopedTheme && scopedTheme !== maybeNewScopedTheme) {
    setScopedTheme(maybeNewScopedTheme);
  }
  const proxifiedTheme = new Proxy(theme, {
    get: (target, prop) => {
      dependencies.add(_NativePlatform.UnistyleDependency.Theme);
      return target[prop];
    }
  });
  const proxifiedRuntime = new Proxy(getMiniRuntime(), {
    get: (target, prop) => {
      if (prop === 'insets') {
        return new Proxy(target.insets, {
          get: (target, prop) => {
            if (prop === 'ime') {
              dependencies.add(_NativePlatform.UnistyleDependency.Ime);
              return target[prop];
            }
            dependencies.add(_NativePlatform.UnistyleDependency.Insets);
            return target[prop];
          }
        });
      }
      if (prop in RTDependencyMap) {
        dependencies.add(RTDependencyMap[prop]);
      }
      if (prop === 'themeName' && scopedTheme) {
        return scopedTheme;
      }
      return target[prop];
    }
  });
  (0, _react.useLayoutEffect)(() => {
    const sameDeps = syncedDependenciesSizeRef.current === dependencies.size;
    const sameScopedTheme = syncedScopedThemeRef.current === scopedTheme;
    if (sameDeps && sameScopedTheme) {
      return;
    }
    syncedDependenciesSizeRef.current = dependencies.size;
    syncedScopedThemeRef.current = scopedTheme;
    reinitListener();
  }, [proxifiedTheme, proxifiedRuntime, scopedTheme]);
  return {
    proxifiedTheme,
    proxifiedRuntime,
    addDependencies: newDependencies => {
      const dependenciesSize = dependencies.size;
      newDependencies.forEach(dependency => {
        dependencies.add(dependency);
      });
      if (dependenciesSize === dependencies.size) {
        return;
      }
      syncedDependenciesSizeRef.current = dependencies.size;
      syncedScopedThemeRef.current = scopedTheme;
      reinitListener();
    }
  };
};
exports.useProxifiedUnistyles = useProxifiedUnistyles;
//# sourceMappingURL=useProxifiedUnistyles.js.map