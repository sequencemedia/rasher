"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = subscribe;
var _listenerManager = _interopRequireDefault(require("../listener-manager"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var LISTENER_MANAGER = new _listenerManager.default();
function subscribe(type, element, handler, context) {
  var phase = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var subscription = {
    listener: LISTENER_MANAGER.create(type, element, handler, context),
    phase: !!phase
  };
  LISTENER_MANAGER.attach(type, element, subscription);
  return {
    stop: function stop() {
      LISTENER_MANAGER.detach(type, element, subscription);
    }
  };
}