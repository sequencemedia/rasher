import {
  ListenerManager
} from '../listener-manager'

const listenerManager = new ListenerManager()

export function subscribe (type, element, handler, context, phase = false) {
  const subscription = {
    listener: listenerManager.create(type, element, handler, context),
    phase: !!phase
  }
  listenerManager.attach(type, element, subscription)
  return {
    stop: () => {
      listenerManager.detach(type, element, subscription)
    }
  }
}
