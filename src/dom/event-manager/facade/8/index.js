import {
  ChangeEventFacade,
  FocusEventFacade,
  MouseEventFacade
} from './event-facade'

export const eventFacade = (type) => (type === 'change')
  ? ChangeEventFacade
  : (type === 'focus' || type === 'blur')
    ? FocusEventFacade
    : MouseEventFacade
