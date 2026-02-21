"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemeToTheme = exports.removeInlineStyles = exports.isGeneratedUnistyle = exports.getMediaQuery = exports.getContainerQuery = exports.getClosestBreakpointValue = exports.extractUnistyleDependencies = exports.extractSecrets = exports.convertTheme = exports.checkForProp = exports.checkForAnimated = exports.assignSecrets = void 0;
var _reactNative = require("react-native");
var _types = require("../../specs/types");
var _utils = require("../../utils");
var unistyles = _interopRequireWildcard(require("../services"));
var _types2 = require("../types");
var _common = require("./common");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const schemeToTheme = scheme => {
  switch (scheme) {
    case _types.ColorScheme.Dark:
      return 'dark';
    case _types.ColorScheme.Light:
    default:
      return 'light';
  }
};
exports.schemeToTheme = schemeToTheme;
const assignSecrets = (object, secrets) => {
  const secretsId = Math.random().toString(36).slice(8);

  // @ts-expect-error assign hidden secrets
  object[`unistyles_${secretsId}`] = {};
  // @ts-expect-error assign hidden secrets
  Object.defineProperties(object[`unistyles_${secretsId}`], (0, _common.reduceObject)(secrets, secret => ({
    value: secret,
    enumerable: false,
    configurable: true
  })));
  return object;
};
exports.assignSecrets = assignSecrets;
const extractSecrets = object => {
  if (!object) {
    return undefined;
  }
  const [, secrets] = Object.entries(object).find(([key]) => key.startsWith('unistyles_')) ?? [];
  if (!secrets) {
    return undefined;
  }
  return (0, _common.reduceObject)(Object.getOwnPropertyDescriptors(secrets), secret => secret.value);
};
exports.extractSecrets = extractSecrets;
const removeInlineStyles = values => {
  const returnValue = {};
  Object.defineProperties(returnValue, (0, _common.reduceObject)(values, value => ({
    value,
    enumerable: false,
    configurable: true
  })));
  return returnValue;
};
exports.removeInlineStyles = removeInlineStyles;
const getMediaQuery = (query, allBreakpoints) => {
  if (Object.values(_types.Orientation).includes(query)) {
    return `@media (orientation: ${query})`;
  }
  if ((0, _utils.isUnistylesMq)(query)) {
    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight
    } = (0, _utils.parseMq)(query);
    const queries = [minWidth ? `(min-width: ${minWidth}px)` : undefined, maxWidth ? `(max-width: ${maxWidth}px)` : undefined, minHeight ? `(min-height: ${minHeight}px)` : undefined, maxHeight ? `(max-height: ${maxHeight}px)` : undefined].filter(Boolean).join(' and ');
    return `@media ${queries}`;
  }
  const breakpointValue = unistyles.services.runtime.breakpoints[query] ?? 0;
  const nextBreakpoint = allBreakpoints.filter(b => b in unistyles.services.runtime.breakpoints).map(b => unistyles.services.runtime.breakpoints[b]).sort((a, b) => a - b).find(b => b > breakpointValue);
  const queries = [`(min-width: ${breakpointValue}px)`, nextBreakpoint ? `(max-width: ${nextBreakpoint - 1}px)` : undefined].filter(Boolean).join(' and ');
  return `@media ${queries}`;
};
exports.getMediaQuery = getMediaQuery;
const getContainerQuery = (query, _allBreakpoints, containerName) => {
  if (Object.values(_types.Orientation).includes(query)) {
    return `@container ${containerName} (orientation: ${query})`;
  }
  if ((0, _utils.isUnistylesMq)(query)) {
    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight
    } = (0, _utils.parseMq)(query);
    const queries = [minWidth ? `(min-width: ${minWidth}px)` : undefined, maxWidth ? `(max-width: ${maxWidth}px)` : undefined, minHeight ? `(min-height: ${minHeight}px)` : undefined, maxHeight ? `(max-height: ${maxHeight}px)` : undefined].filter(Boolean).join(' and ');
    return `@container ${containerName} ${queries}`;
  }

  // Use min-width only (no max-width) so the CSS cascade fills gaps:
  // each rule covers from its breakpoint to infinity, with later/larger
  // rules overriding earlier/smaller ones — matching native parser behavior
  const breakpointValue = unistyles.services.runtime.breakpoints[query] ?? 0;
  return `@container ${containerName} (min-width: ${breakpointValue}px)`;
};
exports.getContainerQuery = getContainerQuery;
const extractUnistyleDependencies = value => {
  if (!value) {
    return [];
  }
  const dependencies = (0, _common.keyInObject)(value, 'uni__dependencies') ? value.uni__dependencies : [];
  return Array.isArray(dependencies) ? dependencies : [];
};
exports.extractUnistyleDependencies = extractUnistyleDependencies;
const checkForProp = (value, prop) => {
  if (Array.isArray(value)) {
    return value.some(nestedValue => checkForProp(nestedValue, prop));
  }
  if (typeof value === 'object' && value !== null) {
    return (0, _common.keyInObject)(value, prop) ? true : (0, _common.keyInObject)(value, '_web') ? checkForProp(value._web, prop) : false;
  }
  return false;
};
exports.checkForProp = checkForProp;
const checkForAnimated = value => {
  if (Array.isArray(value)) {
    return value.some(checkForAnimated);
  }
  if (typeof value === 'object' && value !== null) {
    const objectValues = Object.values(value);
    const secrets = extractSecrets(value);

    // @ts-expect-error React Native Web exports Animated.AnimatedNode as Animated.Node
    return value instanceof _reactNative.Animated.Node || objectValues.length > 0 && objectValues.some(checkForAnimated) || secrets && Object.keys(secrets).length === 0;
  }
  return false;
};
exports.checkForAnimated = checkForAnimated;
const isGeneratedUnistyle = value => {
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every(key => _types2.UNI_GENERATED_KEYS.includes(key));
};
exports.isGeneratedUnistyle = isGeneratedUnistyle;
const convertTheme = (key, value, prev = '-') => {
  if (typeof value === 'object' && value !== null) {
    return [key, Object.fromEntries(Object.entries(value).map(([nestedKey, nestedValue]) => convertTheme(nestedKey, nestedValue, `${prev}-${key}`)))];
  }
  if (typeof value === 'string') {
    return [key, `var(${prev}-${(0, _common.hyphenate)(key)})`];
  }
  return [key, value];
};
exports.convertTheme = convertTheme;
const getClosestBreakpointValue = (runtime, values) => {
  const breakpoints = runtime.breakpoints;
  const breakpointValues = Object.entries(values)
  // Filter out non-breakpoint values
  .filter(pair => pair[0] in breakpoints)
  // Sort in descending order
  .sort(([a], [b]) => (breakpoints[b] ?? 0) - (breakpoints[a] ?? 0));
  // Get breakpoint value with highest priority
  const [_, currentBreakpointValue] = breakpointValues.find(([key]) => (0, _utils.isDefined)(runtime.breakpoint) && (breakpoints[key] ?? 0) <= (breakpoints[runtime.breakpoint] ?? 0)) ?? [];
  return currentBreakpointValue;
};
exports.getClosestBreakpointValue = getClosestBreakpointValue;
//# sourceMappingURL=unistyle.js.map