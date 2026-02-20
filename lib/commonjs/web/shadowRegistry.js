"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnistylesShadowRegistry = void 0;
var _NativePlatform = require("../specs/NativePlatform/NativePlatform.nitro");
var _utils = require("../utils");
var _utils2 = require("./utils");
var _variants = require("./variants");
class UnistylesShadowRegistry {
  // MOCKS
  name = 'UnistylesShadowRegistry';
  __type = 'web';
  equals = () => true;
  toString = () => 'UnistylesShadowRegistry';
  dispose = () => {};
  // END MOCKS

  scopedTheme = undefined;
  _containerDimensions = undefined;
  _containerName = undefined;
  disposeMap = new Map();
  constructor(services) {
    this.services = services;
  }
  add = (ref, hash) => {
    if ((0, _utils2.isServer)() || !(ref instanceof HTMLElement) || !hash) {
      return;
    }
    this.services.registry.connect(ref, hash);
  };
  addStyles = (unistyles, forChild) => {
    const [firstStyle] = unistyles;

    // If it is already a generated style, return it
    if (firstStyle && (0, _utils2.isGeneratedUnistyle)(firstStyle)) {
      return firstStyle;
    }
    const getParsedStyles = () => {
      const allStyles = unistyles.map(unistyle => {
        const secrets = (0, _utils2.extractSecrets)(unistyle);

        // Regular style
        if (!secrets) {
          return unistyle;
        }

        // Animated styles - shouldn't be processed
        if (Object.keys(secrets).length === 0) {
          return {};
        }
        const {
          __uni__key,
          __uni__stylesheet,
          __uni__args = [],
          __stylesheetVariants: variants
        } = secrets;
        const newComputedStylesheet = this.services.registry.getComputedStylesheet(__uni__stylesheet, scopedTheme);
        const style = newComputedStylesheet[__uni__key];
        const result = typeof style === 'function' ? style(...__uni__args) : style;
        const variantsResult = (0, _variants.getVariants)(result, variants);
        const resultWithVariants = (0, _utils.deepMergeObjects)(result, variantsResult);
        const dependencies = (0, _utils2.extractUnistyleDependencies)(resultWithVariants);
        if (typeof __uni__stylesheet === 'function') {
          // Add dependencies from dynamic styles to stylesheet
          this.services.registry.addDependenciesToStylesheet(__uni__stylesheet, dependencies);
        }
        return {
          ...resultWithVariants,
          ...resultWithVariants._web
        };
      });
      return (0, _utils.deepMergeObjects)(...allStyles);
    };

    // Copy scoped theme and container name to not use referenced values
    const scopedTheme = this.scopedTheme;
    const containerName = this._containerName;
    const parsedStyles = getParsedStyles();
    const {
      hash,
      existingHash
    } = this.services.registry.add(parsedStyles, forChild, containerName);
    const injectedClassNames = parsedStyles?._web?._classNames ?? [];
    const injectedClassName = Array.isArray(injectedClassNames) ? injectedClassNames.join(' ') : injectedClassNames;
    const dependencies = (0, _utils2.extractUnistyleDependencies)(parsedStyles);
    const filteredDependencies = this.services.state.CSSVars ? dependencies.filter(dependency => dependency !== _NativePlatform.UnistyleDependency.Theme) : dependencies;
    if (!existingHash) {
      this.disposeMap.set(hash, this.services.listener.addListeners(filteredDependencies, () => {
        this.services.registry.applyStyles(hash, getParsedStyles(), containerName);
      }));
    }
    const hashClassname = forChild ? hash.replace(' > *', '') : hash;
    return {
      injectedClassName,
      hash: hashClassname,
      parsedStyles
    };
  };
  setScopedTheme = theme => {
    this.scopedTheme = theme;
  };
  getScopedTheme = () => this.scopedTheme;
  setContainerDimensions = dimensions => {
    this._containerDimensions = dimensions;
  };
  getContainerDimensions = () => this._containerDimensions;
  setContainerName = name => {
    this._containerName = name;
  };
  getContainerName = () => this._containerName;
  remove = (ref, hash) => {
    if ((0, _utils2.isServer)() || !(ref instanceof HTMLElement) || !hash) {
      return;
    }
    this.services.registry.remove(ref, hash).then(removed => {
      if (!removed) {
        return;
      }
      this.disposeMap.get(hash)?.();
      this.disposeMap.delete(hash);
    });
  };
  flush = () => {};
}
exports.UnistylesShadowRegistry = UnistylesShadowRegistry;
//# sourceMappingURL=shadowRegistry.js.map