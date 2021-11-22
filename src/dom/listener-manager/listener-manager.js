import {
  SUPPORTS_ADD,
  SUPPORTS_REMOVE,

  SUPPORTS_ATTACH,
  SUPPORTS_DETACH,

  ATTACH,
  DETACH
} from '~/bom/rasher'

import {
  notSupported
} from '~/dom/rasher'

import EventManager from '~/dom/event-manager'

const EVENT_MANAGER = new EventManager()

function attachListenerWithPhase (type, element, { listener, phase }) { EVENT_MANAGER.attach(type, element, listener, phase) }

function detachListenerWithPhase (type, element, { listener, phase }) { EVENT_MANAGER.detach(type, element, listener, phase) }

function attachListener (type, element, { listener }) { EVENT_MANAGER.attach(type, element, listener) }

function detachListener (type, element, { listener }) { EVENT_MANAGER.detach(type, element, listener) }

export function create (type, element, handler, context = element) {
  return function (e) {
    return (!element.disabled)
      ? handler.call(context, new (EVENT_MANAGER.eventFacadeFor(type))(EVENT_MANAGER.normalizeEvent(e), element))
      : false
  }
}

export const attach = (ATTACH === SUPPORTS_ADD)
  ? attachListenerWithPhase
  : (ATTACH === SUPPORTS_ATTACH)
      ? attachListener
      : notSupported

export const detach = (DETACH === SUPPORTS_REMOVE)
  ? detachListenerWithPhase
  : (DETACH === SUPPORTS_DETACH)
      ? detachListener
      : notSupported
