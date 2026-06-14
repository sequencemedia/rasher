import { attach, detach, eventFacadeFor, normalizeEvent, eventTargetFor } from './event-manager.mjs';
let eventManager;
export default class EventManager {
  constructor() {
    return eventManager || (eventManager = this instanceof EventManager ? this : new EventManager());
  }
  attach = attach;
  detach = detach;
  eventFacadeFor = eventFacadeFor;
  normalizeEvent = normalizeEvent;
  eventTargetFor = eventTargetFor;
}