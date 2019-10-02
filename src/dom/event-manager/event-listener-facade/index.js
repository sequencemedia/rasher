import {
  ChangeEventFacade,
  FocusEventFacade,
  KeyboardEventFacade,
  MouseEventFacade
} from './event-listener-facade'

export default function eventListenerFacade (type) {
  return (type === 'change')
    ? ChangeEventFacade
    : (type === 'focus' || type === 'blur')
      ? FocusEventFacade
      : type.startsWith('key')
        ? KeyboardEventFacade
        : MouseEventFacade
}
