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
var _query = _interopRequireDefault(require("../query"));
var _sizzle = _interopRequireDefault(require("sizzle"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Match = exports.default = /*#__PURE__*/function () {
  function Match(query) {
    var _this = this;
    _classCallCheck(this, Match);
    _defineProperty(this, "hasNodeListMatch", function (node, nodeList) {
      return node && nodeList.length > 0 ? nodeList.contains(node) : false;
    });
    _defineProperty(this, "hasNodeMatch", _rasher.MATCH === 2 ? function (node, selector) {
      return node.matches(selector);
    } : _rasher.MATCH === 3 ? function (node, selector) {
      return node.webkitMatchesSelector(selector);
    } : _rasher.MATCH === 4 ? function (node, selector) {
      return node.mozMatchesSelector(selector);
    } : _rasher.MATCH === 5 ? function (node, selector) {
      return node.msMatchesSelector(selector);
    } : _rasher.MATCH === 6 ? function (node, selector) {
      return node.oMatchesSelector(selector);
    } : function (node, selector) {
      return _sizzle.default.matchesSelector(node, selector);
    });
    _defineProperty(this, "matchFrom", _rasher.MATCH < 2 ? function (node, selector) {
      return _this.matchNodeInNodeList(node, selector);
    } : function (node, selector) {
      return _this.matchNode(node, selector);
    });
    this.query = query || new _query.default();
  }
  return _createClass(Match, [{
    key: "matchNodeInNodeList",
    value: function matchNodeInNodeList(node, selector) {
      var nodeList = this.query.queryForNodeList(selector);
      if (nodeList.length > 0) {
        var rootNode = this.query.node;
        while (node !== rootNode) {
          if (this.hasNodeListMatch(node, nodeList)) {
            return node;
          } else {
            if ((node = node.parentNode || null) === null) {
              return null;
            }
          }
        }
      }
      return null;
    }
  }, {
    key: "matchNode",
    value: function matchNode(node, selector) {
      var rootNode = this.query.node;
      while (node !== rootNode) {
        if (this.hasNodeMatch(node, selector)) {
          return node;
        } else {
          if ((node = node.parentNode || null) === null) {
            return null;
          }
        }
      }
      return null;
    }
  }]);
}();