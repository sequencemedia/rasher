import ListenerManager from '~/dom/listener-manager'

const LISTENER_MANAGER = new ListenerManager()

export function subscribe (type, element, handler, context, phase = false) {
  const subscription = {
    listener: LISTENER_MANAGER.create(type, element, handler, context),
    phase: !!phase
  }
  LISTENER_MANAGER.attach(type, element, subscription)
  return {
    stop () {
      LISTENER_MANAGER.detach(type, element, subscription)
    }
  }
}
