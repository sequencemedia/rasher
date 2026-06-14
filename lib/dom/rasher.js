import Listener from './listener/index.mjs';
import Delegate from './delegate/index.mjs';
export const notSupported = () => {
  throw new Error('Not supported');
};
export const notImplemented = () => {
  throw new Error('Not implemented');
};
export class Rasher {
  Listener = Listener;
  listener = new Listener();
  Delegate = Delegate;
  delegate = new Delegate();
}