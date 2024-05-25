"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchEventFacade = exports.MouseEventFacade = exports.KeyboardEventFacade = exports.FocusEventFacade = exports.ChangeEventFacade = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.reflect.has.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var keyMap = new Map(Object.entries({
  25: 9,
  // SHIFT-TAB
  63232: 38,
  // u
  63233: 40,
  // d
  63234: 37,
  // l
  63235: 39,
  // r
  63272: 46,
  // DEL
  63273: 36,
  // home
  63275: 35,
  // END
  63276: 33,
  // page u
  63277: 34 // page d
}));
function initialize(event, currentTarget) {
  this.target = event.target || event.srcElement;
  this.originalEvent = event;
  this.currentTarget = currentTarget || null;
  this.relatedTarget = event.relatedTarget || null;
}
function ingestEvent(facadeMap, event, eventFacade) {
  facadeMap.entries().forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      KEY = _ref2[1];
    if (Reflect.has(event, key)) {
      eventFacade[KEY] = Reflect.get(event, key);
    }
  });
}
var EventFacade = /*#__PURE__*/function () {
  function EventFacade() {
    _classCallCheck(this, EventFacade);
  }
  return _createClass(EventFacade, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this.originalEvent.stopPropagation();
    }
  }, {
    key: "preventDefault",
    value: function preventDefault() {
      this.originalEvent.preventDefault();
    }
  }, {
    key: "stop",
    value: function stop() {
      var originalEvent = this.originalEvent;
      originalEvent.stopPropagation();
      originalEvent.preventDefault();
    }
  }]);
}();
var ChangeEventFacade = exports.ChangeEventFacade = /*#__PURE__*/function (_EventFacade) {
  function ChangeEventFacade(event, currentTarget) {
    var _this;
    _classCallCheck(this, ChangeEventFacade);
    initialize.call(_this = _callSuper(this, ChangeEventFacade), event, currentTarget);
    return _this;
  }
  _inherits(ChangeEventFacade, _EventFacade);
  return _createClass(ChangeEventFacade);
}(EventFacade);
var FocusEventFacade = exports.FocusEventFacade = /*#__PURE__*/function (_EventFacade2) {
  function FocusEventFacade(event, currentTarget) {
    var _this2;
    _classCallCheck(this, FocusEventFacade);
    initialize.call(_this2 = _callSuper(this, FocusEventFacade), event, currentTarget);
    return _this2;
  }
  _inherits(FocusEventFacade, _EventFacade2);
  return _createClass(FocusEventFacade);
}(EventFacade);
var MouseEventFacade = exports.MouseEventFacade = /*#__PURE__*/function (_EventFacade3) {
  function MouseEventFacade(event, currentTarget) {
    var _this3;
    _classCallCheck(this, MouseEventFacade);
    initialize.call(_this3 = _callSuper(this, MouseEventFacade), event, currentTarget);
    var key = event.keyCode || event.charCode;
    if (typeof (keyMap.has(key) ? keyMap.get(key) : key) === 'number') {
      _this3.key = key;
    }
    ingestEvent(MouseEventFacade.map, event, _this3);
    return _this3;
  }
  _inherits(MouseEventFacade, _EventFacade3);
  return _createClass(MouseEventFacade);
}(EventFacade);
_defineProperty(MouseEventFacade, "map", new Map(Object.entries({
  ctrlKey: 'ctrl',
  altKey: 'alt',
  metaKey: 'meta',
  shiftKey: 'shift',
  altGraphKey: 'altGraph',
  clientX: 'clientX',
  clientY: 'clientY',
  pageX: 'pageX',
  pageY: 'pageY'
})));
var KeyboardEventFacade = exports.KeyboardEventFacade = /*#__PURE__*/function (_EventFacade4) {
  function KeyboardEventFacade(event, currentTarget) {
    var _this4;
    _classCallCheck(this, KeyboardEventFacade);
    initialize.call(_this4 = _callSuper(this, KeyboardEventFacade), event, currentTarget);
    var key = event.keyCode || event.charCode;
    if (typeof (keyMap.has(key) ? keyMap.get(key) : key) === 'number') {
      _this4.key = key;
    }
    ingestEvent(KeyboardEventFacade.map, event, _this4);
    return _this4;
  }
  _inherits(KeyboardEventFacade, _EventFacade4);
  return _createClass(KeyboardEventFacade);
}(EventFacade);
_defineProperty(KeyboardEventFacade, "map", new Map(Object.entries({
  ctrlKey: 'ctrl',
  altKey: 'alt',
  metaKey: 'meta',
  shiftKey: 'shiftKey',
  altGraphKey: 'altGraph'
})));
var TouchEventFacade = exports.TouchEventFacade = /*#__PURE__*/function (_EventFacade5) {
  // eslint-disable-line
  function TouchEventFacade(event, currentTarget) {
    var _this5;
    _classCallCheck(this, TouchEventFacade);
    initialize.call(_this5 = _callSuper(this, TouchEventFacade), event, currentTarget);
    return _this5;
  }
  _inherits(TouchEventFacade, _EventFacade5);
  return _createClass(TouchEventFacade);
}(EventFacade);