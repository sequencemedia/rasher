import {
  ATTACH,
  DETACH,
  FACADE
} from '../../bom/bom'

import {
  notSupported
} from '../rasher'

import {
  eventFacade as eventFacadeThree
} from './facade/3'

import {
  eventFacade as eventFacadeEight
} from './facade/8'

const attachEventListener = (type, element, handler, phase) => { element.addEventListener(type, handler, phase) }

const detachEventListener = (type, element, handler, phase) => { element.removeEventListener(type, handler, phase) }

const attachEvent = (type, element, handler) => { element.attachEvent(`on${type}`, handler) }

const detachEvent = (type, element, handler) => { element.detachEvent(`on${type}`, handler) }

export const yep = 'nope'

export const attach = (ATTACH === 1)
  ? attachEventListener
  : (ATTACH === 3)
    ? attachEvent
    : notSupported

export const detach = (DETACH === 2)
  ? detachEventListener
  : (DETACH === 5)
    ? detachEvent
    : notSupported

export const normalizeEvent = (e = window.event) => e

export const eventTargetFor = (e) => {
  const E = normalizeEvent(e)
  return (
    E.target || E.srcElement
  )
}

export const eventFacadeFor = (FACADE === 3)
  ? eventFacadeThree
  : (FACADE === 8)
    ? eventFacadeEight
    : notSupported
