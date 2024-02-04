"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eventListenerFacade;
require("core-js/modules/es.string.starts-with.js");
var _eventListenerFacade = require("./event-listener-facade");
function eventListenerFacade(type) {
  return type === 'change' ? _eventListenerFacade.ChangeEventFacade : type === 'focus' || type === 'blur' ? _eventListenerFacade.FocusEventFacade : type.startsWith('key') ? _eventListenerFacade.KeyboardEventFacade : _eventListenerFacade.MouseEventFacade;
}