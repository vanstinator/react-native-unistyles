"use strict";

import { UnistyleDependency } from '../specs/NativePlatform';
export class UnistylesListener {
  isInitialized = false;
  listeners = Array.from({
    length: Object.keys(UnistyleDependency).length / 2
  }, () => new Set());
  stylesheetListeners = Array.from({
    length: Object.keys(UnistyleDependency).length / 2
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
      this.emitChange(UnistyleDependency.ColorScheme);
      if (this.services.runtime.hasAdaptiveThemes) {
        this.emitChange(UnistyleDependency.Theme);
        this.emitChange(UnistyleDependency.ThemeName);
      }
    });
    this.services.runtime.lightMedia?.addEventListener('change', event => {
      if (!event.matches) {
        return;
      }
      this.emitChange(UnistyleDependency.ColorScheme);
      if (this.services.runtime.hasAdaptiveThemes) {
        this.emitChange(UnistyleDependency.Theme);
        this.emitChange(UnistyleDependency.ThemeName);
      }
    });
    window.addEventListener('orientationchange', () => this.emitChange(UnistyleDependency.Orientation));
    window.addEventListener('resize', () => this.emitChange(UnistyleDependency.Dimensions));
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
//# sourceMappingURL=listener.js.map