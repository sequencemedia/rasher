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

import {
  EventManager
} from '~/dom/event-manager'

const eventManager = new EventManager()

function attachListenerWithPhase (type, element, { listener, phase }) { eventManager.attach(type, element, listener, phase) }

function detachListenerWithPhase (type, element, { listener, phase }) { eventManager.detach(type, element, listener, phase) }

function attachListener (type, element, { listener }) { eventManager.attach(type, element, listener) }

function detachListener (type, element, { listener }) { eventManager.detach(type, element, listener) }

export function create (type, element, handler, context = element) {
  return function (e) {
    return (!element.disabled)
      ? handler.call(context, new (eventManager.eventFacadeFor(type))(eventManager.normalizeEvent(e), element))
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
