function initialize (event, currentTarget) {
  this.target = event.srcElement
  this.originalEvent = event
  this.currentTarget = currentTarget || null
  this.relatedTarget = event.relatedTarget || null
}

class EventFacade {
  stopPropagation = () => {
    this.originalEvent.cancelBubble = true
  }

  preventDefault = () => {
    this.originalEvent.returnValue = false
  }

  stop = () => {
    const {
      originalEvent
    } = this

    originalEvent.cancelBubble = true
    originalEvent.returnValue = false
  }
}

export class ChangeEventFacade extends EventFacade {
  constructor (event, currentTarget) {
    initialize.call(super(), event, currentTarget)
  }
}

export class FocusEventFacade extends EventFacade {
  constructor (event, currentTarget) {
    initialize.call(super(), event, currentTarget)
  }
}

export class TouchEventFacade extends EventFacade { // eslint-disable-line
  constructor (event, currentTarget) {
    initialize.call(super(), event, currentTarget)
  }
}

export class MouseEventFacade extends EventFacade {
  constructor (event, currentTarget) {
    initialize.call(super(), event, currentTarget)
    this.key = event.keyCode
    this.ctrl = event.ctrlKey
    this.alt = event.altKey
    this.meta = event.metaKey
    this.shift = event.shiftKey
    this.clientX = event.clientX
    this.clientY = event.clientY
    this.pageX = event.pageX
    this.pageY = event.pageY
  }
}
