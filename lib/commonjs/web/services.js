"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.services = void 0;
var _listener = require("./listener");
var _registry = require("./registry");
var _runtime = require("./runtime");
var _shadowRegistry = require("./shadowRegistry");
var _state = require("./state");
var _utils = require("./utils");
class UnistylesServices {
  services = {};
  constructor() {
    this.runtime = new _runtime.UnistylesRuntime(this.services);
    this.registry = new _registry.UnistylesRegistry(this.services);
    this.shadowRegistry = new _shadowRegistry.UnistylesShadowRegistry(this.services);
    this.state = new _state.UnistylesState(this.services);
    this.listener = new _listener.UnistylesListener(this.services);
    this.services.runtime = this.runtime;
    this.services.registry = this.registry;
    this.services.shadowRegistry = this.shadowRegistry;
    this.services.state = this.state;
    this.services.listener = this.listener;
  }
}
if ((0, _utils.isServer)() && !globalThis.__unistyles__) {
  // @ts-ignore
  globalThis.__unistyles__ = new UnistylesServices();
}
const services = exports.services = (0, _utils.isServer)() ? globalThis.__unistyles__ : new UnistylesServices();
//# sourceMappingURL=services.js.map