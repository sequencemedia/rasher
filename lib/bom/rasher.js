"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTS_REMOVE = exports.SUPPORTS_QUERY_SELECTOR_ALL = exports.SUPPORTS_QUERY_SELECTOR = exports.SUPPORTS_MATCHES_WK = exports.SUPPORTS_MATCHES_OP = exports.SUPPORTS_MATCHES_MZ = exports.SUPPORTS_MATCHES_MS = exports.SUPPORTS_MATCHES = exports.SUPPORTS_DETACH = exports.SUPPORTS_CONTAINS_MATCHES_WK = exports.SUPPORTS_CONTAINS_MATCHES_OP = exports.SUPPORTS_CONTAINS_MATCHES_MZ = exports.SUPPORTS_CONTAINS_MATCHES_MS = exports.SUPPORTS_CONTAINS_MATCHES = exports.SUPPORTS_ATTACH = exports.SUPPORTS_ADD = exports.QUERY = exports.NOT_SUPPORTED = exports.NOT_RECOGNISED = exports.MATCH = exports.FACADE = exports.DETACH = exports.ATTACH = void 0;
var NOT_SUPPORTED = exports.NOT_SUPPORTED = 0;
var NOT_RECOGNISED = exports.NOT_RECOGNISED = 1;
var SUPPORTS_ADD = exports.SUPPORTS_ADD = 1;
var SUPPORTS_REMOVE = exports.SUPPORTS_REMOVE = 2;
var SUPPORTS_ATTACH = exports.SUPPORTS_ATTACH = 3;
var SUPPORTS_DETACH = exports.SUPPORTS_DETACH = 4;
var SUPPORTS_QUERY_SELECTOR = exports.SUPPORTS_QUERY_SELECTOR = 1;
var SUPPORTS_QUERY_SELECTOR_ALL = exports.SUPPORTS_QUERY_SELECTOR_ALL = 2;
var SUPPORTS_CONTAINS_MATCHES = exports.SUPPORTS_CONTAINS_MATCHES = 2;
var SUPPORTS_CONTAINS_MATCHES_WK = exports.SUPPORTS_CONTAINS_MATCHES_WK = 3;
var SUPPORTS_CONTAINS_MATCHES_MZ = exports.SUPPORTS_CONTAINS_MATCHES_MZ = 4;
var SUPPORTS_CONTAINS_MATCHES_MS = exports.SUPPORTS_CONTAINS_MATCHES_MS = 5;
var SUPPORTS_CONTAINS_MATCHES_OP = exports.SUPPORTS_CONTAINS_MATCHES_OP = 6;
var SUPPORTS_MATCHES = exports.SUPPORTS_MATCHES = 7;
var SUPPORTS_MATCHES_WK = exports.SUPPORTS_MATCHES_WK = 8;
var SUPPORTS_MATCHES_MZ = exports.SUPPORTS_MATCHES_MZ = 9;
var SUPPORTS_MATCHES_MS = exports.SUPPORTS_MATCHES_MS = 10;
var SUPPORTS_MATCHES_OP = exports.SUPPORTS_MATCHES_OP = 11;
var ATTACH = exports.ATTACH = 'addEventListener' in window ? SUPPORTS_ADD : 'attachEvent' in window ? SUPPORTS_ATTACH : NOT_SUPPORTED;
var DETACH = exports.DETACH = 'removeEventListener' in window ? SUPPORTS_REMOVE : 'detachEvent' in window ? SUPPORTS_DETACH : NOT_SUPPORTED;
var QUERY = exports.QUERY = 'querySelector' in document.documentElement ? 'querySelectorAll' in document.documentElement ? SUPPORTS_QUERY_SELECTOR_ALL : SUPPORTS_QUERY_SELECTOR : NOT_SUPPORTED;
var MATCH = exports.MATCH = 'contains' in document.documentElement ? 'matches' in document.documentElement ? SUPPORTS_CONTAINS_MATCHES : 'webkitMatchesSelector' in document.documentElement ? SUPPORTS_CONTAINS_MATCHES_WK : 'mozMatchesSelector' in document.documentElement ? SUPPORTS_CONTAINS_MATCHES_MZ : 'msMatchesSelector' in document.documentElement ? SUPPORTS_CONTAINS_MATCHES_MS : 'oMatchesSelector' in document.documentElement ? SUPPORTS_CONTAINS_MATCHES_OP : NOT_RECOGNISED : 'matches' in document.documentElement ? SUPPORTS_MATCHES : 'webkitMatchesSelector' in document.documentElement ? SUPPORTS_MATCHES_WK : 'mozMatchesSelector' in document.documentElement ? SUPPORTS_MATCHES_MZ : 'msMatchesSelector' in document.documentElement ? SUPPORTS_MATCHES_MS : 'oMatchesSelector' in document.documentElement ? SUPPORTS_MATCHES_OP : NOT_SUPPORTED;
var FACADE = exports.FACADE = ATTACH + DETACH;