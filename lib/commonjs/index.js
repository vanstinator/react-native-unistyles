"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Display", {
  enumerable: true,
  get: function () {
    return _components.Display;
  }
});
Object.defineProperty(exports, "Hide", {
  enumerable: true,
  get: function () {
    return _components.Hide;
  }
});
Object.defineProperty(exports, "NavigationBar", {
  enumerable: true,
  get: function () {
    return _specs.NavigationBar;
  }
});
Object.defineProperty(exports, "ScopedTheme", {
  enumerable: true,
  get: function () {
    return _components.ScopedTheme;
  }
});
Object.defineProperty(exports, "StatusBar", {
  enumerable: true,
  get: function () {
    return _specs.StatusBar;
  }
});
Object.defineProperty(exports, "StyleSheet", {
  enumerable: true,
  get: function () {
    return _specs.StyleSheet;
  }
});
Object.defineProperty(exports, "UnistylesBreakpointContainerProvider", {
  enumerable: true,
  get: function () {
    return _components.UnistylesBreakpointContainerProvider;
  }
});
Object.defineProperty(exports, "UnistylesRuntime", {
  enumerable: true,
  get: function () {
    return _specs.UnistylesRuntime;
  }
});
Object.defineProperty(exports, "createUnistylesElement", {
  enumerable: true,
  get: function () {
    return _core.createUnistylesElement;
  }
});
Object.defineProperty(exports, "getServerUnistyles", {
  enumerable: true,
  get: function () {
    return _server.getServerUnistyles;
  }
});
Object.defineProperty(exports, "hydrateServerUnistyles", {
  enumerable: true,
  get: function () {
    return _server.hydrateServerUnistyles;
  }
});
Object.defineProperty(exports, "mq", {
  enumerable: true,
  get: function () {
    return _mq.mq;
  }
});
Object.defineProperty(exports, "resetServerUnistyles", {
  enumerable: true,
  get: function () {
    return _server.resetServerUnistyles;
  }
});
Object.defineProperty(exports, "useServerUnistyles", {
  enumerable: true,
  get: function () {
    return _server.useServerUnistyles;
  }
});
Object.defineProperty(exports, "useUnistyles", {
  enumerable: true,
  get: function () {
    return _core.useUnistyles;
  }
});
Object.defineProperty(exports, "withUnistyles", {
  enumerable: true,
  get: function () {
    return _core.withUnistyles;
  }
});
var _react = _interopRequireDefault(require("react"));
var _specs = require("./specs");
var _mq = require("./mq");
var _core = require("./core");
var _components = require("./components");
var _server = require("./server");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const [majorReactVersions] = _react.default.version.split('.').map(Number.parseInt);
if (majorReactVersions === undefined || majorReactVersions < 19) {
  throw new Error('Unistyles 🦄: To enable full Fabric power you need to use React 19.0.0 or higher');
}
//# sourceMappingURL=index.js.map