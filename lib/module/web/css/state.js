"use strict";

import { convertUnistyles } from '../convert';
import { hyphenate, isServer } from '../utils';
import { convertToCSS } from './core';
const safeGetMap = (map, key) => {
  const nextLevelMap = map.get(key);
  if (!nextLevelMap) {
    const newMap = new Map();
    map.set(key, newMap);
    return newMap;
  }
  return nextLevelMap;
};
export class CSSState {
  mainMap = new Map();
  mqMap = new Map();
  styleTag = null;
  themesCSS = new Map();
  constructor(services) {
    this.services = services;
    if (isServer()) {
      return;
    }
    const ssrTag = document.getElementById('unistyles-web');
    if (ssrTag) {
      this.styleTag = ssrTag;
      return;
    }
    this.styleTag = document.createElement('style');
    this.styleTag.id = 'unistyles-web';
    document.head.appendChild(this.styleTag);
  }
  set = ({
    className,
    propertyKey,
    value,
    mediaQuery = '',
    isMq
  }) => {
    const firstLevelMap = isMq ? this.mqMap : this.mainMap;
    const secondLevelMap = safeGetMap(firstLevelMap, mediaQuery);
    const thirdLevelMap = safeGetMap(secondLevelMap, className);
    thirdLevelMap.set(propertyKey, value);
  };
  add = (hash, values, containerName) => {
    convertToCSS(hash, convertUnistyles(values, this.services.runtime), this, containerName);
    this.recreate();
  };
  recreate = () => {
    if (this.styleTag) {
      this.styleTag.innerText = this.getStyles();
    }
  };
  addTheme = (theme, values) => {
    let themeVars = '';
    const convertToCSS = (key, value, prev = '-') => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => convertToCSS(nestedKey, nestedValue, `${prev}-${key}`));
      }
      if (typeof value === 'string') {
        themeVars += `${prev}-${hyphenate(key)}:${value};`;
      }
    };
    Object.entries(values).forEach(([key, value]) => convertToCSS(key, value));
    if (theme === 'light' || theme === 'dark') {
      this.themesCSS.set(`media ${theme}`, `@media (prefers-color-scheme: ${theme}){:root{${themeVars}}}`);
    }
    this.themesCSS.set(theme, `:root.${theme}{${themeVars}}`);
  };
  remove = hash => {
    this.mainMap.forEach(styles => {
      styles.delete(hash);
    });
    this.mqMap.forEach(styles => {
      styles.delete(hash);
    });
    this.recreate();
  };
  getStyles = () => {
    let styles = Array.from(this.themesCSS.entries()).reduce((acc, [, themeCss]) => {
      return acc + themeCss;
    }, '');
    const generate = (mediaQuery, secondLevelMap) => {
      if (mediaQuery) {
        styles += `${mediaQuery}{`;
      }
      for (const [className, thirdLevelMap] of secondLevelMap) {
        styles += `.${className}{`;
        for (const [propertyKey, value] of thirdLevelMap) {
          if (value === undefined) {
            continue;
          }
          styles += `${hyphenate(propertyKey)}:${value};`;
        }
        styles += '}';
      }
      if (mediaQuery) {
        styles += '}';
      }
    };
    for (const [mediaQuery, secondLevelMap] of this.mainMap) {
      generate(mediaQuery, secondLevelMap);
    }
    for (const [mediaQuery, secondLevelMap] of this.mqMap) {
      generate(mediaQuery, secondLevelMap);
    }
    return styles;
  };
  getState = () => {
    const getState = map => {
      return Array.from(map).map(([mediaQuery, classNames]) => {
        return [mediaQuery, Array.from(classNames.entries()).map(([className, style]) => {
          return [className, Array.from(style.entries()).map(([property, value]) => {
            return [property, value];
          })];
        })];
      });
    };
    const mainState = getState(this.mainMap);
    const mqState = getState(this.mqMap);
    const config = this.services.state.getConfig();
    return {
      mainState,
      mqState,
      config
    };
  };
  hydrate = ({
    mainState,
    mqState
  }) => {
    const hydrateState = (map, isMq = false) => {
      map.forEach(([mediaQuery, classNames]) => {
        classNames.forEach(([className, style]) => {
          style.forEach(([propertyKey, value]) => {
            this.set({
              className,
              propertyKey,
              value,
              mediaQuery,
              isMq
            });
          });
        });
      });
    };
    hydrateState(mainState);
    hydrateState(mqState, true);
  };
  reset = () => {
    this.mqMap.clear();
    this.mainMap.clear();
  };
}
//# sourceMappingURL=state.js.map