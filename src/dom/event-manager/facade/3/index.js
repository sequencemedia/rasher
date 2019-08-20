import {
  ChangeEventFacade,
  FocusEventFacade,
  KeyboardEventFacade,
  MouseEventFacade
} from './event-facade'

export const eventFacade = (type) => (type === 'change')
  ? ChangeEventFacade
  : (type === 'focus' || type === 'blur')
    ? FocusEventFacade
    : type.startsWith('key')
      ? KeyboardEventFacade
      : MouseEventFacade
