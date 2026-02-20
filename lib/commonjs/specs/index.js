"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  UnistyleDependency: true
};
Object.defineProperty(exports, "UnistyleDependency", {
  enumerable: true,
  get: function () {
    return _NativePlatform.UnistyleDependency;
  }
});
var _web = require("../web");
Object.keys(_web).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _web[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _web[key];
    }
  });
});
var _NativePlatform = require("./NativePlatform");
//# sourceMappingURL=index.js.map