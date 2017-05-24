import {
  Listener
} from './listener'

import {
  Delegate
} from './delegate'

export const notSupported = () => { throw new Error('Not supported') }

export const notImplemented = () => { throw new Error('Not implemented') }

export class Rasher {
  Listener = Listener
  listener = new Listener()
  Delegate = Delegate
  delegate = new Delegate()
}

import Sizzle from 'sizzle'

console.log(Sizzle)
