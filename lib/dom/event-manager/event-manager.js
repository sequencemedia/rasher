"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeEvent = exports.eventTargetFor = exports.eventFacadeFor = exports.detach = exports.attach = void 0;
var _rasher = require("../../bom/rasher");
var _rasher2 = require("../rasher");
var _eventListenerFacade = _interopRequireDefault(require("./event-listener-facade"));
var _eventFacade = _interopRequireDefault(require("./event-facade"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var EVENT_LISTENER = _rasher.SUPPORTS_ADD + _rasher.SUPPORTS_REMOVE;
var EVENT = _rasher.SUPPORTS_ATTACH + _rasher.SUPPORTS_DETACH;
function attachEventListener(type, element, handler, phase) {
  element.addEventListener(type, handler, phase);
}
function detachEventListener(type, element, handler, phase) {
  element.removeEventListener(type, handler, phase);
}
function attachEvent(type, element, handler) {
  element.attachEvent('on'.concat(type), handler);
}
function detachEvent(type, element, handler) {
  element.detachEvent('on'.concat(type), handler);
}
var attach = exports.attach = _rasher.ATTACH === _rasher.SUPPORTS_ADD ? attachEventListener : _rasher.ATTACH === _rasher.SUPPORTS_ATTACH ? attachEvent : _rasher2.notSupported;
var detach = exports.detach = _rasher.DETACH === _rasher.SUPPORTS_REMOVE ? detachEventListener : _rasher.DETACH === _rasher.SUPPORTS_DETACH ? detachEvent : _rasher2.notSupported;
var normalizeEvent = exports.normalizeEvent = function normalizeEvent() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;
  return e;
};
var eventTargetFor = exports.eventTargetFor = function eventTargetFor(e) {
  var E = normalizeEvent(e);
  return E.target || E.srcElement;
};
var eventFacadeFor = exports.eventFacadeFor = _rasher.FACADE === EVENT_LISTENER ? _eventListenerFacade.default : _rasher.FACADE === EVENT ? _eventFacade.default : _rasher2.notSupported;