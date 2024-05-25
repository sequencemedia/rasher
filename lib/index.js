"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.find = find;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _listener2 = _interopRequireDefault(require("./dom/listener"));
var _delegate2 = _interopRequireDefault(require("./dom/delegate"));
var _query3 = _interopRequireDefault(require("./dom/query"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function stopFactory(subscription) {
  return function stop() {
    subscription.stop();
  };
}
var has = function has(array, index) {
  return typeof index === 'number' /* IS NUMBER */ && !(index < 0) /* LOWER BOUND (index not less than zero) */ && array.length > index /* UPPER BOUND (length more than index) */;
};
function stopAll(subscriptionList) {
  if (subscriptionList.length === 0) return false;
  var subscription;
  while (subscription = subscriptionList.shift()) {
    subscription.stop();
  }
  return true;
}
function listAll(subscriptionList) {
  return {
    // get length () { return subscriptionList.length } // old IE safe?
    node: function node(index) {
      return has(subscriptionList, index) ? subscriptionList[index].node : null;
    },
    type: function type(index) {
      return has(subscriptionList, index) ? subscriptionList[index].type : null;
    },
    stop: function stop(index) {
      if (has(subscriptionList, index)) {
        subscriptionList.splice(index, 1).shift().stop();
        return true;
      }
      return false;
    },
    indexOf: function indexOf(node) {
      return subscriptionList.findIndex(function (_ref) {
        var n = _ref.node;
        return node === n;
      });
    },
    size: function size() {
      return subscriptionList.length;
    }
  };
}
function delegateRasher() {
  var _delegate;
  var _query;
  var _rasher;
  return {
    delegate: function delegate() {
      return _delegate || (_delegate = new _delegate2.default());
    },
    query: function query() {
      return _query || (_query = new _query3.default());
    },
    rasher: function rasher() {
      return _rasher || (_rasher = {
        stopAll: stopAll,
        listAll: listAll
      });
    }
  };
}
function listenerRasher() {
  var _listener;
  var _query2;
  var _rasher2;
  return {
    listener: function listener() {
      return _listener || (_listener = new _listener2.default());
    },
    query: function query() {
      return _query2 || (_query2 = new _query3.default());
    },
    rasher: function rasher() {
      return _rasher2 || (_rasher2 = {
        stopAll: stopAll,
        listAll: listAll
      });
    }
  };
}
function delegateFacade(rasher, list, node, selector) {
  return {
    on: function on(type) {
      if (typeof type !== 'string') return null;

      /* Else */

      return {
        do: function _do(handler) {
          var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            context = _ref2.context,
            phase = _ref2.phase;
          if ((handler || false).constructor !== Function) return null;
          var delegate = rasher.delegate();
          list.push({
            type: type,
            node: node,
            stop: stopFactory(delegate.subscribe(type, node, selector, handler, context, phase))
          });
        }
      };
    }
  };
}
function listenerFacade(rasher, list, node) {
  return {
    on: function on(type) {
      if (typeof type !== 'string') return null;

      /* Else */

      return {
        do: function _do(handler) {
          var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            context = _ref3.context,
            phase = _ref3.phase;
          if ((handler || false).constructor !== Function) return null;
          var listener = rasher.listener();
          list.push({
            type: type,
            node: node,
            stop: stopFactory(listener.subscribe(type, node, handler, context, phase))
          });
        }
      };
    }
  };
}
function find(selector) {
  return {
    delegateTo: function delegateTo(delegate) {
      return {
        then: function then(callOut) {
          /* If no `callOut` */
          if ((callOut || false).constructor !== Function) {
            return {
              stopAll: function stopAll() {
                return false;
              },
              listAll: function listAll() {
                return [];
              }
            };
          }

          /* Else */

          var rasher = delegateRasher();
          var q = rasher.query();
          var k = rasher.rasher();
          var nodeList = q.queryForNodeList(delegate);
          var i = 0;
          var j = nodeList.length;
          var subscriptionList = []; // always an array

          if (i < j) {
            var _loop = function _loop() {
              var subscriptionNode = nodeList[i];
              var face = delegateFacade(rasher, subscriptionList, subscriptionNode, selector);
              var list = function list() {
                var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                  node = _ref4.node;
                return subscriptionNode === node;
              };
              var each = function each(x) {
                var z = subscriptionList.findIndex(function (y) {
                  return x === y;
                });
                subscriptionList.splice(z, 1).shift().stop();
              };
              callOut.call(subscriptionNode, face, {
                node: function node() {
                  return subscriptionNode;
                },
                stop: function stop() {
                  var a = subscriptionList.filter(list);
                  if (a.length === 0) return false;
                  a.forEach(each);
                  return true;
                },
                index: function index() {
                  return subscriptionList.findIndex(list);
                },
                size: function size() {
                  return subscriptionList.length;
                }
              }, i, j);
            };
            do {
              _loop();
            } while ((i = i + 1) < j);
          }
          return {
            stopAll: function stopAll() {
              return k.stopAll(subscriptionList);
            },
            listAll: function listAll() {
              return k.listAll(subscriptionList);
            }
          };
        },
        toArray: function toArray() {
          var q = new _query3.default();
          return Array.from(q.queryForNodeList(selector)).concat(Array.from(q.queryForNodeList(delegate)));
        }
      };
    },
    then: function then(callOut) {
      /* If no `callOut` */
      if ((callOut || false).constructor !== Function) {
        return {
          stopAll: function stopAll() {
            return false;
          },
          listAll: function listAll() {
            return [];
          }
        };
      }

      /* Else */

      var rasher = listenerRasher();
      var q = rasher.query();
      var k = rasher.rasher();
      var nodeList = q.queryForNodeList(selector);
      var i = 0;
      var j = nodeList.length;
      var subscriptionList = []; // always an array

      if (i < j) {
        var _loop2 = function _loop2() {
          var subscriptionNode = nodeList[i];
          var face = listenerFacade(rasher, subscriptionList, subscriptionNode);
          var list = function list() {
            var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              node = _ref5.node;
            return subscriptionNode === node;
          };
          var each = function each(x) {
            var z = subscriptionList.findIndex(function (y) {
              return x === y;
            });
            subscriptionList.splice(z, 1).shift().stop();
          };
          callOut.call(subscriptionNode, face, {
            node: function node() {
              return subscriptionNode;
            },
            stop: function stop() {
              var a = subscriptionList.filter(list);
              if (a.length === 0) return false;
              a.forEach(each);
              return true;
            },
            index: function index() {
              return subscriptionList.findIndex(list);
            },
            size: function size() {
              return subscriptionList.length;
            }
          }, i, j);
        };
        do {
          _loop2();
        } while ((i = i + 1) < j);
      }
      return {
        stopAll: function stopAll() {
          return k.stopAll(subscriptionList);
        },
        listAll: function listAll() {
          return k.listAll(subscriptionList);
        }
      };
    },
    toArray: function toArray() {
      var q = new _query3.default();
      var nodeList = q.queryForNodeList(selector);
      return Array.from(nodeList);
    }
  };
}
var Rasher = exports.default = /*#__PURE__*/_createClass(function Rasher() {
  _classCallCheck(this, Rasher);
  _defineProperty(this, "find", find);
});