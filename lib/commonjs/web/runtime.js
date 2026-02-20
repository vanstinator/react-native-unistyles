"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnistylesRuntime = void 0;
var _NativePlatform = require("../specs/NativePlatform");
var _types = require("../specs/types");
var _types2 = require("../types");
var _mock = require("./mock");
var _utils = require("./utils");
class UnistylesRuntime {
  lightMedia = this.getLightMedia();
  darkMedia = this.getDarkMedia();
  rootElement = (0, _utils.isServer)() ? null : document.querySelector(':root');
  constructor(services) {
    this.services = services;
  }
  getLightMedia() {
    if ((0, _utils.isServer)()) {
      return null;
    }
    if (!this.lightMedia) {
      this.lightMedia = window.matchMedia('(prefers-color-scheme: light)');
    }
    return this.lightMedia;
  }
  getDarkMedia() {
    if ((0, _utils.isServer)()) {
      return null;
    }
    if (!this.darkMedia) {
      this.darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    }
    return this.darkMedia;
  }
  get colorScheme() {
    switch (true) {
      case this.getLightMedia()?.matches:
        return _types.ColorScheme.Light;
      case this.getDarkMedia()?.matches:
        return _types.ColorScheme.Dark;
      default:
        return _types.ColorScheme.Unspecified;
    }
  }
  get themeName() {
    const scopedTheme = this.services.shadowRegistry.getScopedTheme();
    if (scopedTheme) {
      return scopedTheme;
    }
    if (this.services.state.hasAdaptiveThemes) {
      return (0, _utils.schemeToTheme)(this.colorScheme);
    }
    return this.services.state.themeName;
  }
  get contentSizeCategory() {
    return _types2.WebContentSizeCategory.Unspecified;
  }
  get breakpoints() {
    return this.services.state.breakpoints ?? {};
  }
  get breakpoint() {
    return this.services.state.breakpoint;
  }
  get orientation() {
    if ((0, _utils.isServer)()) {
      return _types.Orientation.Portrait;
    }
    return screen.orientation.type.includes('portrait') ? _types.Orientation.Portrait : _types.Orientation.Landscape;
  }
  get isLandscape() {
    return this.orientation === _types.Orientation.Landscape;
  }
  get isPortrait() {
    return this.orientation === _types.Orientation.Portrait;
  }
  get theme() {
    return this.getTheme(this.themeName);
  }
  get pixelRatio() {
    return (0, _utils.isServer)() ? 1 : window.devicePixelRatio;
  }
  get screen() {
    if ((0, _utils.isServer)()) {
      return {
        width: 0,
        height: 0
      };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  get fontScale() {
    return 1;
  }
  get insets() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      ime: 0
    };
  }
  get statusBar() {
    return _mock.StatusBar;
  }
  get rtl() {
    return (0, _utils.isServer)() ? true : document.documentElement.dir === 'rtl';
  }
  get hasAdaptiveThemes() {
    return this.services.state.hasAdaptiveThemes;
  }
  get navigationBar() {
    return _mock.NavigationBar;
  }
  get miniRuntime() {
    return {
      colorScheme: this.colorScheme,
      themeName: this.themeName,
      contentSizeCategory: this.contentSizeCategory,
      breakpoint: this.breakpoint,
      isLandscape: this.orientation === _types.Orientation.Landscape,
      isPortrait: this.orientation === _types.Orientation.Portrait,
      pixelRatio: this.pixelRatio,
      screen: this.screen,
      fontScale: this.fontScale,
      insets: this.insets,
      statusBar: {
        width: this.statusBar.width,
        height: this.statusBar.height
      },
      navigationBar: {
        width: this.navigationBar.width,
        height: this.navigationBar.height
      },
      rtl: this.rtl,
      hasAdaptiveThemes: this.hasAdaptiveThemes
    };
  }
  setTheme = themeName => {
    if (this.hasAdaptiveThemes) {
      throw (0, _utils.error)(`You're trying to set theme to: '${themeName}', but adaptiveThemes are enabled.`);
    }
    if (themeName === this.themeName) {
      return;
    }
    const oldTheme = this.services.state.themeName;
    this.services.state.themeName = themeName;
    this.services.listener.emitChange(_NativePlatform.UnistyleDependency.Theme);
    this.services.listener.emitChange(_NativePlatform.UnistyleDependency.ThemeName);
    if (!(0, _utils.isServer)() && !this.services.state.hasAdaptiveThemes && this.services.state.CSSVars) {
      this.rootElement?.classList.remove(oldTheme ?? '');
      this.rootElement?.classList.add(themeName ?? '');
    }
  };
  setAdaptiveThemes = isEnabled => {
    if (this.services.state.hasAdaptiveThemes === isEnabled) {
      return;
    }
    this.services.listener.emitChange(_NativePlatform.UnistyleDependency.AdaptiveThemes);
    if (!isEnabled) {
      this.services.state.hasAdaptiveThemes = isEnabled;
      this.rootElement?.classList.add(this.themeName ?? '');
      return;
    }
    this.rootElement?.classList.remove(this.themeName ?? '');
    this.setTheme((0, _utils.schemeToTheme)(this.colorScheme));
    this.services.state.hasAdaptiveThemes = isEnabled;
  };
  setRootViewBackgroundColor = color => {
    if ((0, _utils.isServer)()) {
      return;
    }
    document.documentElement.style.backgroundColor = color;
  };
  setImmersiveMode = () => {};
  updateTheme = (themeName, updater) => {
    const oldTheme = this.services.state.themes.get(themeName);
    if (!oldTheme) {
      throw (0, _utils.error)(`Unistyles: You're trying to update theme "${themeName}" but it wasn't registered.`);
    }
    const newTheme = updater(oldTheme);
    this.services.state.themes.set(themeName, newTheme);
    this.services.listener.emitChange(_NativePlatform.UnistyleDependency.Theme);
    if (this.services.state.CSSVars) {
      this.services.state.cssThemes.set(themeName, Object.fromEntries(Object.entries(newTheme).map(([key, value]) => {
        return (0, _utils.convertTheme)(key, value);
      })));
      this.services.registry.css.addTheme(themeName, newTheme);
      this.services.registry.css.recreate();
    }
  };
  getTheme = (themeName = this.themeName, CSSVars = false) => {
    const hasSomeThemes = this.services.state.themes.size > 0;
    if (!hasSomeThemes) {
      return new Proxy({}, {
        get: () => {
          throw (0, _utils.error)('One of your stylesheets is trying to get the theme, but no theme has been selected yet. Did you forget to call StyleSheet.configure? If you called it, make sure you did so before any StyleSheet.create.');
        }
      });
    }
    if (!themeName) {
      return new Proxy({}, {
        get: () => {
          throw (0, _utils.error)('One of your stylesheets is trying to get the theme, but no theme has been selected yet. Did you forget to select an initial theme?');
        }
      });
    }
    const theme = CSSVars ? this.services.state.cssThemes.get(themeName ?? '') : this.services.state.themes.get(themeName ?? '');
    if (!theme) {
      return new Proxy({}, {
        get: () => {
          throw (0, _utils.error)(`You're trying to get theme "${themeName}" but it wasn't registered.`);
        }
      });
    }
    return theme;
  };
}
exports.UnistylesRuntime = UnistylesRuntime;
//# sourceMappingURL=runtime.js.map