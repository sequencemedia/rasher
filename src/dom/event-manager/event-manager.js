import {
  SUPPORTS_ADD,
  SUPPORTS_REMOVE,

  SUPPORTS_ATTACH,
  SUPPORTS_DETACH,

  ATTACH,
  DETACH,
  FACADE
} from '~/bom/rasher'

import {
  notSupported
} from '~/dom/rasher'

import eventListenerFacade from './event-listener-facade'

import eventFacade from './event-facade'

const EVENT_LISTENER = SUPPORTS_ADD + SUPPORTS_REMOVE
const EVENT = SUPPORTS_ATTACH + SUPPORTS_DETACH

function attachEventListener (type, element, handler, phase) { element.addEventListener(type, handler, phase) }

function detachEventListener (type, element, handler, phase) { element.removeEventListener(type, handler, phase) }

function attachEvent (type, element, handler) { element.attachEvent('on'.concat(type), handler) }

function detachEvent (type, element, handler) { element.detachEvent('on'.concat(type), handler) }

export const attach = (
  (ATTACH === SUPPORTS_ADD)
    ? attachEventListener
    : (ATTACH === SUPPORTS_ATTACH)
      ? attachEvent
      : notSupported)

export const detach = (
  (DETACH === SUPPORTS_REMOVE)
    ? detachEventListener
    : (DETACH === SUPPORTS_DETACH)
      ? detachEvent
      : notSupported)

export const normalizeEvent = (e = window.event) => e

export const eventTargetFor = (e) => {
  const E = normalizeEvent(e)
  return (
    E.target || E.srcElement
  )
}

export const eventFacadeFor = (
  (FACADE === EVENT_LISTENER)
    ? eventListenerFacade
    : (FACADE === EVENT)
      ? eventFacade
      : notSupported)
