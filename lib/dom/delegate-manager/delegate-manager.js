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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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