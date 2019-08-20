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

import {
  eventFacade as eventFacadeThree
} from './facade/3'

import {
  eventFacade as eventFacadeSeven
} from './facade/7'

const THREE = SUPPORTS_ADD + SUPPORTS_REMOVE
const SEVEN = SUPPORTS_ATTACH + SUPPORTS_DETACH

const attachEventListener = (type, element, handler, phase) => { element.addEventListener(type, handler, phase) }

const detachEventListener = (type, element, handler, phase) => { element.removeEventListener(type, handler, phase) }

const attachEvent = (type, element, handler) => { element.attachEvent('on'.concat(type), handler) }

const detachEvent = (type, element, handler) => { element.detachEvent('on'.concat(type), handler) }

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

export const eventFacadeFor = (FACADE === THREE)
  ? eventFacadeThree
  : (FACADE === SEVEN)
    ? eventFacadeSeven
    : notSupported
