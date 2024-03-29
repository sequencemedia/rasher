"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attach = void 0;
exports.create = create;
exports.detach = exports.default = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _rasher = require("../../bom/rasher");
var _rasher2 = require("../rasher");
var _eventManager = _interopRequireDefault(require("../event-manager"));
var _match = _interopRequireDefault(require("../match"));
var _query = _interopRequireDefault(require("../query"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EVENT_MANAGER = new _eventManager.default();
function attachDelegateWithPhase(type, element, _ref) {
  var delegate = _ref.delegate,
    phase = _ref.phase;
  EVENT_MANAGER.attach(type, element, delegate, phase);
}
function detachDelegateWithPhase(type, element, _ref2) {
  var delegate = _ref2.delegate,
    phase = _ref2.phase;
  EVENT_MANAGER.detach(type, element, delegate, phase);
}
function attachDelegate(type, element, subscription) {
  var supplementary = subscription.supplementary;
  if (supplementary) {
    var index = 0;
    var limit = supplementary.length;
    for (index, limit; index < limit; index = index + 1) {
      var _supplementary$index = supplementary[index],
        _type = _supplementary$index.type,
        delegate = _supplementary$index.delegate;
      EVENT_MANAGER.attach(_type, element, delegate);
    }
  } else {
    var _delegate = subscription.delegate;
    EVENT_MANAGER.attach(type, element, _delegate);
  }
}
function detachDelegate(type, element, subscription) {
  var supplementary = subscription.supplementary;
  if (supplementary) {
    var index = 0;
    var limit = supplementary.length;
    for (index, limit; index < limit; index = index + 1) {
      var _supplementary$index2 = supplementary[index],
        _type2 = _supplementary$index2.type,
        delegate = _supplementary$index2.delegate;
      EVENT_MANAGER.detach(_type2, element, delegate);
    }
  } else {
    var _delegate2 = subscription.delegate;
    EVENT_MANAGER.detach(type, element, _delegate2);
  }
}
function create(type, element, selector, handler, context) {
  return function (e) {
    var normalizedEvent = EVENT_MANAGER.normalizeEvent(e);
    var targetNode = EVENT_MANAGER.eventTargetFor(normalizedEvent);
    if (targetNode.disabled) {
      return false;
    } else {
      var match = new _match.default(new _query.default(element));
      var ELEMENT = match.matchFrom(targetNode, selector);
      return ELEMENT ? handler.call(context || ELEMENT, new (EVENT_MANAGER.eventFacadeFor(type))(normalizedEvent, ELEMENT)) : false;
    }
  };
}
var attach = exports.attach = _rasher.ATTACH === _rasher.SUPPORTS_ADD ? attachDelegateWithPhase : _rasher.ATTACH === _rasher.SUPPORTS_ATTACH ? attachDelegate : _rasher2.notSupported;
var detach = exports.detach = _rasher.DETACH === _rasher.SUPPORTS_REMOVE ? detachDelegateWithPhase : _rasher.DETACH === _rasher.SUPPORTS_DETACH ? detachDelegate : _rasher2.notSupported;
var DelegateManager = exports.default = /*#__PURE__*/_createClass(function DelegateManager() {
  _classCallCheck(this, DelegateManager);
  _defineProperty(this, "create", create);
  _defineProperty(this, "attach", attach);
  _defineProperty(this, "detach", detach);
});