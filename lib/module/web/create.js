"use strict";

import * as unistyles from './services';
import { assignSecrets, error, isServer, removeInlineStyles } from './utils';
export const create = (stylesheet, id) => {
  if (!id) {
    throw error('Unistyles is not initialized correctly. Please add babel plugin to your babel config.');
  }

  // For SSR
  if (!unistyles.services.state.isInitialized && !isServer()) {
    const config = window?.__UNISTYLES_STATE__?.config;
    config && unistyles.services.state.init(config);
  }
  const computedStylesheet = unistyles.services.registry.getComputedStylesheet(stylesheet);
  const addSecrets = (value, key, args = undefined, variants = {}) => assignSecrets(value, {
    __uni__key: key,
    __uni__stylesheet: stylesheet,
    __uni__args: args,
    __stylesheetVariants: variants
  });
  const createStyleSheetStyles = variants => {
    const stylesEntries = Object.entries(computedStylesheet).map(([key, value]) => {
      if (typeof value === 'function') {
        return [key, (...args) => {
          const result = removeInlineStyles(value(...args));
          return addSecrets(result, key, args, variants);
        }];
      }
      return [key, addSecrets(removeInlineStyles(value), key, undefined, variants)];
    });
    return Object.fromEntries(stylesEntries.concat([useVariants]));
  };
  const useVariants = ['useVariants', variants => {
    return createStyleSheetStyles(variants);
  }];
  return createStyleSheetStyles();
};
//# sourceMappingURL=create.js.map