"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnistylesListener = void 0;
var _NativePlatform = require("../specs/NativePlatform");
class UnistylesListener {
  isInitialized = false;
  listeners = Array.from({
    length: Object.keys(_NativePlatform.UnistyleDependency).length / 2
  }, () => new Set());
  stylesheetListeners = Array.from({
    length: Object.keys(_NativePlatform.UnistyleDependency).length / 2
  }, () => new Set());
  constructor(services) {
    this.services = services;
  }
  emitChange = dependency => {
    this.stylesheetListeners[dependency]?.forEach(listener => listener(dependency));
    this.listeners[dependency]?.forEach(listener => listener(dependency));
  };
  initListeners = () => {
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;
    this.services.runtime.darkMedia?.addEventListener('change', event => {
      if (!event.matches) {
        return;
      }
      this.emitChange(_NativePlatform.UnistyleDependency.ColorScheme);
      if (this.services.runtime.hasAdaptiveThemes) {
        this.emitChange(_NativePlatform.UnistyleDependency.Theme);
        this.emitChange(_NativePlatform.UnistyleDependency.ThemeName);
      }
    });
    this.services.runtime.lightMedia?.addEventListener('change', event => {
      if (!event.matches) {
        return;
      }
      this.emitChange(_NativePlatform.UnistyleDependency.ColorScheme);
      if (this.services.runtime.hasAdaptiveThemes) {
        this.emitChange(_NativePlatform.UnistyleDependency.Theme);
        this.emitChange(_NativePlatform.UnistyleDependency.ThemeName);
      }
    });
    window.addEventListener('orientationchange', () => this.emitChange(_NativePlatform.UnistyleDependency.Orientation));
    window.addEventListener('resize', () => this.emitChange(_NativePlatform.UnistyleDependency.Dimensions));
  };
  addListeners = (dependencies, listener) => {
    dependencies.forEach(dependency => this.listeners[dependency]?.add(listener));
    return () => {
      dependencies.forEach(dependency => this.listeners[dependency]?.delete(listener));
    };
  };
  addStylesheetListeners = (dependencies, listener) => {
    dependencies.forEach(dependency => this.stylesheetListeners[dependency]?.add(listener));
    return () => {
      dependencies.forEach(dependency => this.stylesheetListeners[dependency]?.delete(listener));
    };
  };
}
exports.UnistylesListener = UnistylesListener;
//# sourceMappingURL=listener.js.map