import {
  ChangeEventFacade,
  FocusEventFacade,
  KeyboardEventFacade,
  MouseEventFacade
} from './event-listener-facade.mjs'

export default function eventListenerFacade (type) {
  return (type === 'change')
    ? ChangeEventFacade
    : (type === 'focus' || type === 'blur')
        ? FocusEventFacade
        : type.startsWith('key')
          ? KeyboardEventFacade
          : MouseEventFacade
}
