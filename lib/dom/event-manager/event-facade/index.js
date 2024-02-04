"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eventFacade;
var _eventFacade = require("./event-facade");
function eventFacade(type) {
  return type === 'change' ? _eventFacade.ChangeEventFacade : type === 'focus' || type === 'blur' ? _eventFacade.FocusEventFacade : _eventFacade.MouseEventFacade;
}