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
exports.default = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _rasher = require("../../bom/rasher");
var _sizzle = _interopRequireDefault(require("sizzle"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Query = exports.default = /*#__PURE__*/_createClass(function Query(_node) {
  var _this = this;
  _classCallCheck(this, Query);
  _defineProperty(this, "isAncestorOf", _rasher.MATCH > _rasher.NOT_SUPPORTED ? function (node) {
    return node ? _this.node.contains(node) : false;
  } : function (node) {
    return node ? _sizzle.default.contains(_this.node, node) : false;
  });
  _defineProperty(this, "isDescendantOf", _rasher.MATCH > _rasher.NOT_SUPPORTED ? function (node) {
    return node ? node.contains(_this.node) : false;
  } : function (node) {
    return node ? _sizzle.default.contains(node, _this.node) : false;
  });
  _defineProperty(this, "isSelectedBy", _rasher.MATCH === _rasher.SUPPORTS_CONTAINS_MATCHES || _rasher.MATCH === _rasher.SUPPORTS_MATCHES ? function (selector) {
    return _this.node.matches(selector);
  } : _rasher.MATCH === _rasher.SUPPORTS_CONTAINS_MATCHES_WK || _rasher.MATCH === _rasher.SUPPORTS_MATCHES_WK ? function (selector) {
    return _this.node.webkitMatchesSelector(selector);
  } : _rasher.MATCH === _rasher.SUPPORTS_CONTAINS_MATCHES_MZ || _rasher.MATCH === _rasher.SUPPORTS_MATCHES_MZ ? function (selector) {
    return _this.node.mozMatchesSelector(selector);
  } : _rasher.MATCH === _rasher.SUPPORTS_CONTAINS_MATCHES_MS || _rasher.MATCH === _rasher.SUPPORTS_MATCHES_MS ? function (selector) {
    return _this.node.msMatchesSelector(selector);
  } : _rasher.MATCH === _rasher.SUPPORTS_CONTAINS_MATCHES_OP || _rasher.MATCH === _rasher.SUPPORTS_MATCHES_OP ? function (selector) {
    return _this.node.oMatchesSelector(selector);
  } : function (selector) {
    return _sizzle.default.matchesSelector(_this.node, selector);
  });
  _defineProperty(this, "is", function (node) {
    return node === _this.node;
  });
  _defineProperty(this, "queryForNode", _rasher.QUERY > _rasher.NOT_SUPPORTED ? function (selector) {
    return _this.node.querySelector(selector);
  } : function (selector) {
    return (0, _sizzle.default)(selector, _this.node, []).shift() || null;
  });
  _defineProperty(this, "queryForNodeList", _rasher.QUERY > _rasher.SUPPORTS_QUERY_SELECTOR ? function (selector) {
    return _this.node.querySelectorAll(selector);
  } : function (selector) {
    return (0, _sizzle.default)(selector, _this.node, []);
  });
  this.node = _node || document.documentElement;
});