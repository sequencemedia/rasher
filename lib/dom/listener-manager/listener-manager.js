"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attach = void 0;
exports.create = create;
exports.detach = void 0;
var _rasher = require("../../bom/rasher");
var _rasher2 = require("../rasher");
var _eventManager = _interopRequireDefault(require("../event-manager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var EVENT_MANAGER = new _eventManager.default();
function attachListenerWithPhase(type, element, _ref) {
  var listener = _ref.listener,
    phase = _ref.phase;
  EVENT_MANAGER.attach(type, element, listener, phase);
}
function detachListenerWithPhase(type, element, _ref2) {
  var listener = _ref2.listener,
    phase = _ref2.phase;
  EVENT_MANAGER.detach(type, element, listener, phase);
}
function attachListener(type, element, _ref3) {
  var listener = _ref3.listener;
  EVENT_MANAGER.attach(type, element, listener);
}
function detachListener(type, element, _ref4) {
  var listener = _ref4.listener;
  EVENT_MANAGER.detach(type, element, listener);
}
function create(type, element, handler) {
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : element;
  return function (e) {
    return !element.disabled ? handler.call(context, new (EVENT_MANAGER.eventFacadeFor(type))(EVENT_MANAGER.normalizeEvent(e), element)) : false;
  };
}
var attach = exports.attach = _rasher.ATTACH === _rasher.SUPPORTS_ADD ? attachListenerWithPhase : _rasher.ATTACH === _rasher.SUPPORTS_ATTACH ? attachListener : _rasher2.notSupported;
var detach = exports.detach = _rasher.DETACH === _rasher.SUPPORTS_REMOVE ? detachListenerWithPhase : _rasher.DETACH === _rasher.SUPPORTS_DETACH ? detachListener : _rasher2.notSupported;