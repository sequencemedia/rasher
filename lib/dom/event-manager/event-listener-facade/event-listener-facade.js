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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
  _createClass(EventFacade, [{
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
  return EventFacade;
}();
var ChangeEventFacade = exports.ChangeEventFacade = /*#__PURE__*/function (_EventFacade) {
  _inherits(ChangeEventFacade, _EventFacade);
  function ChangeEventFacade(event, currentTarget) {
    var _this;
    _classCallCheck(this, ChangeEventFacade);
    initialize.call(_this = _callSuper(this, ChangeEventFacade), event, currentTarget);
    return _this;
  }
  return _createClass(ChangeEventFacade);
}(EventFacade);
var FocusEventFacade = exports.FocusEventFacade = /*#__PURE__*/function (_EventFacade2) {
  _inherits(FocusEventFacade, _EventFacade2);
  function FocusEventFacade(event, currentTarget) {
    var _this2;
    _classCallCheck(this, FocusEventFacade);
    initialize.call(_this2 = _callSuper(this, FocusEventFacade), event, currentTarget);
    return _this2;
  }
  return _createClass(FocusEventFacade);
}(EventFacade);
var MouseEventFacade = exports.MouseEventFacade = /*#__PURE__*/function (_EventFacade3) {
  _inherits(MouseEventFacade, _EventFacade3);
  function MouseEventFacade(event, currentTarget) {
    var _this3;
    _classCallCheck(this, MouseEventFacade);
    initialize.call(_this3 = _callSuper(this, MouseEventFacade), event, currentTarget);
    var key = event.keyCode || event.charCode;
    if (typeof (keyMap.has(key) ? keyMap.get(key) : key) === 'number') {
      _this3.key = key;
    }
    ingestEvent(MouseEventFacade.map, event, _assertThisInitialized(_this3));
    return _this3;
  }
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
  _inherits(KeyboardEventFacade, _EventFacade4);
  function KeyboardEventFacade(event, currentTarget) {
    var _this4;
    _classCallCheck(this, KeyboardEventFacade);
    initialize.call(_this4 = _callSuper(this, KeyboardEventFacade), event, currentTarget);
    var key = event.keyCode || event.charCode;
    if (typeof (keyMap.has(key) ? keyMap.get(key) : key) === 'number') {
      _this4.key = key;
    }
    ingestEvent(KeyboardEventFacade.map, event, _assertThisInitialized(_this4));
    return _this4;
  }
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
  _inherits(TouchEventFacade, _EventFacade5);
  // eslint-disable-line
  function TouchEventFacade(event, currentTarget) {
    var _this5;
    _classCallCheck(this, TouchEventFacade);
    initialize.call(_this5 = _callSuper(this, TouchEventFacade), event, currentTarget);
    return _this5;
  }
  return _createClass(TouchEventFacade);
}(EventFacade);