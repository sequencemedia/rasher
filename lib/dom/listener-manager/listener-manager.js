import {
  ATTACH,
  DETACH
} from '../../bom/bom'

import {
  notSupported
} from '../rasher'

import {
  EventManager
} from '../event-manager'

const eventManager = new EventManager()

const attachListenerWithPhase = (type, element, { listener, phase }) => { eventManager.attach(type, element, listener, phase) }

const detachListenerWithPhase = (type, element, { listener, phase }) => { eventManager.detach(type, element, listener, phase) }

const attachListener = (type, element, { listener }) => { eventManager.attach(type, element, listener) }

const detachListener = (type, element, { listener }) => { eventManager.detach(type, element, listener) }

export const create = (type, element, handler, context = element) => (e) => (!element.disabled)
  ? handler.call(context, new (eventManager.eventFacadeFor(type))(eventManager.normalizeEvent(e), element))
  : false

export const attach = (ATTACH === 1)
  ? attachListenerWithPhase
  : (ATTACH === 3)
    ? attachListener
    : notSupported

export const detach = (DETACH === 2)
  ? detachListenerWithPhase
  : (DETACH === 5)
    ? detachListener
    : notSupported

