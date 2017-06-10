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

import {
  Match
} from '../match'

import {
  Query
} from '../query'

const eventManager = new EventManager()

const attachDelegateWithPhase = (type, element, { delegate, phase }) => { eventManager.attach(type, element, delegate, phase) }

const detachDelegateWithPhase = (type, element, { delegate, phase }) => { eventManager.detach(type, element, delegate, phase) }

const attachDelegate = (type, element, subscription) => {
  const {
    supplementary
  } = subscription
  if (supplementary) {
    let index = 0
    const limit = supplementary.length
    for (index, limit; index < limit; index = index + 1) {
      const {
        type,
        delegate
      } = supplementary[index]
      eventManager.attach(type, element, delegate)
    }
  } else {
    const {
      delegate
    } = subscription
    eventManager.attach(type, element, delegate)
  }
}

const detachDelegate = (type, element, subscription) => {
  const {
    supplementary
  } = subscription
  if (supplementary) {
    let index = 0
    const limit = supplementary.length
    for (index, limit; index < limit; index = index + 1) {
      const {
        type,
        delegate
      } = supplementary[index]
      eventManager.detach(type, element, delegate)
    }
  } else {
    const {
      delegate
    } = subscription
    eventManager.detach(type, element, delegate)
  }
}

export const create = (type, element, selector, handler, context) => (e) => {
  const normalizedEvent = eventManager.normalizeEvent(e)
  const targetNode = eventManager.eventTargetFor(normalizedEvent)
  if (targetNode.disabled) {
    return false
  } else {
    const match = new Match(new Query(element))
    const ELEMENT = match.matchFrom(targetNode, selector)
    return (ELEMENT)
      ? handler.call(context || ELEMENT, new (eventManager.eventFacadeFor(type))(normalizedEvent, ELEMENT))
      : false
  }
}

export const attach = (ATTACH === 1)
  ? attachDelegateWithPhase
  : (ATTACH === 3)
    ? attachDelegate
    : notSupported

export const detach = (DETACH === 2)
  ? detachDelegateWithPhase
  : (DETACH === 5)
    ? detachDelegate
    : notSupported

export class DelegateManager {
  create = create
  attach = attach
  detach = detach
}
