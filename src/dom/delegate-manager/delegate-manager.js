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

import {
  Match
} from '~/dom/match'

import {
  Query
} from '~/dom/query'

const eventManager = new EventManager()

function attachDelegateWithPhase (type, element, { delegate, phase }) { eventManager.attach(type, element, delegate, phase) }

function detachDelegateWithPhase (type, element, { delegate, phase }) { eventManager.detach(type, element, delegate, phase) }

function attachDelegate (type, element, subscription) {
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

function detachDelegate (type, element, subscription) {
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

export function create (type, element, selector, handler, context) {
  return function (e) {
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
}

export const attach = (ATTACH === SUPPORTS_ADD)
  ? attachDelegateWithPhase
  : (ATTACH === SUPPORTS_ATTACH)
    ? attachDelegate
    : notSupported

export const detach = (DETACH === SUPPORTS_REMOVE)
  ? detachDelegateWithPhase
  : (DETACH === SUPPORTS_DETACH)
    ? detachDelegate
    : notSupported

export class DelegateManager {
  create = create

  attach = attach

  detach = detach
}
