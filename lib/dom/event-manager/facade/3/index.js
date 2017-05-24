import {
  ChangeEventFacade,
  FocusEventFacade,
  MouseEventFacade,
  KeyboardEventFacade
} from './event-facade'

export const eventFacade = (type) => (type === 'change')
  ? ChangeEventFacade
  : (type === 'focus' || type === 'blur')
    ? FocusEventFacade
    : type.indexOf('key') < 0
      ? MouseEventFacade
      : KeyboardEventFacade

