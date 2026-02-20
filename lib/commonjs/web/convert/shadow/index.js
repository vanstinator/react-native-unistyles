"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _boxShadow = require("./boxShadow");
Object.keys(_boxShadow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _boxShadow[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _boxShadow[key];
    }
  });
});
var _textShadow = require("./textShadow");
Object.keys(_textShadow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _textShadow[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _textShadow[key];
    }
  });
});
//# sourceMappingURL=index.js.map