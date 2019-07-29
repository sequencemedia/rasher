const keyMap = {
  25: 9, // SHIFT-TAB
  63232: 38, // u
  63233: 40, // d
  63234: 37, // l
  63235: 39, // r
  63272: 46, // DEL
  63273: 36, // home
  63275: 35, // END
  63276: 33, // page u
  63277: 34 // page d
}

function initialize (event, currentTarget) {
  this.target = event.target || event.srcElement
  this.originalEvent = event
  this.currentTarget = currentTarget || null
  this.relatedTarget = event.relatedTarget || null
}

function ingestEvent (facadeMap, event, eventFacade) {
  let key
  for (key in facadeMap) {
    if (key in event) {
      const KEY = facadeMap[key]
      eventFacade[KEY] = event[key]
    }
  }
}

class EventFacade {
  stopPropagation () {
    this.originalEvent.stopPropagation()
  }

  preventDefault () {
    this.originalEvent.preventDefault()
  }

  stop () {
    const {
      originalEvent
    } = this

    originalEvent.stopPropagation()
    originalEvent.preventDefault()
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

export class MouseEventFacade extends EventFacade {
  static map = {
    ctrlKey: 'ctrl',
    altKey: 'alt',
    metaKey: 'meta',
    shiftKey: 'shift',
    altGraphKey: 'altGraph',
    clientX: 'clientX',
    clientY: 'clientY',
    pageX: 'pageX',
    pageY: 'pageY'
  }

  constructor (event, currentTarget) {
    initialize.call(super(), event, currentTarget)
    let key
    if (typeof ((key = event.keyCode || event.charCode) in keyMap ? keyMap[key] : key) === 'number') {
      this.key = key
    }
    ingestEvent(MouseEventFacade.map, event, this)
  }
}

export class KeyboardEventFacade extends EventFacade {
  static map = {
    ctrlKey: 'ctrl',
    altKey: 'alt',
    metaKey: 'meta',
    shiftKey: 'shiftKey',
    altGraphKey: 'altGraph'
  }

  constructor (event, currentTarget) {
    initialize.call(super(), event, currentTarget)
    let key
    if (((key = event.keyCode || event.charCode) in keyMap ? keyMap[key] : key) === 'number') {
      this.key = key
    }
    ingestEvent(KeyboardEventFacade.map, event, this)
  }
}

export class TouchEventFacade extends EventFacade { // eslint-disable-line
  constructor (event, currentTarget) {
    initialize.call(super(), event, currentTarget)
  }
}
