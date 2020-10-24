import {
  ChangeEventFacade,
  FocusEventFacade,
  MouseEventFacade
} from './event-facade'

export default function eventFacade (type) {
  return (type === 'change')
    ? ChangeEventFacade
    : (type === 'focus' || type === 'blur')
        ? FocusEventFacade
        : MouseEventFacade
}
