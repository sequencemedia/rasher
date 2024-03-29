"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchEventFacade = exports.MouseEventFacade = exports.FocusEventFacade = exports.ChangeEventFacade = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function initialize(event, currentTarget) {
  this.target = event.srcElement;
  this.originalEvent = event;
  this.currentTarget = currentTarget || null;
  this.relatedTarget = event.relatedTarget || null;
}
var EventFacade = /*#__PURE__*/function () {
  function EventFacade() {
    _classCallCheck(this, EventFacade);
  }
  return _createClass(EventFacade, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this.originalEvent.cancelBubble = true;
    }
  }, {
    key: "preventDefault",
    value: function preventDefault() {
      this.originalEvent.returnValue = false;
    }
  }, {
    key: "stop",
    value: function stop() {
      var originalEvent = this.originalEvent;
      originalEvent.cancelBubble = true;
      originalEvent.returnValue = false;
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
var TouchEventFacade = exports.TouchEventFacade = /*#__PURE__*/function (_EventFacade3) {
  // eslint-disable-line
  function TouchEventFacade(event, currentTarget) {
    var _this3;
    _classCallCheck(this, TouchEventFacade);
    initialize.call(_this3 = _callSuper(this, TouchEventFacade), event, currentTarget);
    return _this3;
  }
  _inherits(TouchEventFacade, _EventFacade3);
  return _createClass(TouchEventFacade);
}(EventFacade);
var MouseEventFacade = exports.MouseEventFacade = /*#__PURE__*/function (_EventFacade4) {
  function MouseEventFacade(event, currentTarget) {
    var _this4;
    _classCallCheck(this, MouseEventFacade);
    initialize.call(_this4 = _callSuper(this, MouseEventFacade), event, currentTarget);
    _this4.key = event.keyCode;
    _this4.ctrl = event.ctrlKey;
    _this4.alt = event.altKey;
    _this4.meta = event.metaKey;
    _this4.shift = event.shiftKey;
    _this4.clientX = event.clientX;
    _this4.clientY = event.clientY;
    _this4.pageX = event.pageX;
    _this4.pageY = event.pageY;
    return _this4;
  }
  _inherits(MouseEventFacade, _EventFacade4);
  return _createClass(MouseEventFacade);
}(EventFacade);