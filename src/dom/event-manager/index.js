import {
  attach,
  detach,
  eventFacadeFor,
  normalizeEvent,
  eventTargetFor
} from './event-manager'

let eventManager

export class EventManager {
  constructor () {
    return (
      eventManager || (
        eventManager = (this instanceof EventManager
          ? this
          : new EventManager()))
    )
  }

  attach = attach
  detach = detach

  eventFacadeFor = eventFacadeFor
  normalizeEvent = normalizeEvent
  eventTargetFor = eventTargetFor
}
