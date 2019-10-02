import {
  SUPPORTS_ADD,
  SUPPORTS_REMOVE,

  SUPPORTS_ATTACH,
  SUPPORTS_DETACH,

  FACADE
} from '~/bom/rasher'

import {
  notSupported
} from '~/dom/rasher'

import {
  DelegateManager
} from '~/dom/delegate-manager'

const DELEGATE_WITH_PHASE = SUPPORTS_ADD + SUPPORTS_REMOVE
const DELEGATE = SUPPORTS_ATTACH + SUPPORTS_DETACH

const delegateManager = new DelegateManager()

function delegateWithPhase (type, element, selector, handler, context, phase = false) {
  const subscription = {
    delegate: delegateManager.create(type, element, selector, handler, context),
    phase: (type === 'focus' || type === 'blur') ? true : !!phase
  }
  delegateManager.attach(type, element, subscription)
  return {
    stop () {
      delegateManager.detach(type, element, subscription)
    }
  }
}

function getChangeSubscription (type, element, selector, handler, context) {
  const subscription = {
    type,
    delegate: delegateManager.create(type, element, selector, handler, context),
    supplementary: [
      {
        type: 'beforeactivate',
        delegate () { // can use 'attachEvent()' and 'detachEvent()' on DOM
          let nodeName
          let targetNode
          if ((nodeName = (targetNode = event.srcElement).nodeName.toLowerCase()) === 'select') { // eslint-disable-line
            targetNode.attachEvent('onchange', subscription.delegate)
          } else if (nodeName === 'input') {
            const nodeType = targetNode.type
            if (nodeType === 'text' || nodeType === 'password') {
              subscription.value = targetNode.value
            } else if (nodeType === 'radio' || nodeType === 'checkbox') {
              subscription.checked = targetNode.checked
              targetNode.attachEvent('onclick', (subscription.onclick = () => {
                if (targetNode.checked !== subscription.checked) {
                  subscription.checked = targetNode.checked // remember state of control for additional clicks (deactivate will remove the handler)
                  targetNode.fireEvent('onchange', document.createEventObject())
                }
              }))
            }
            targetNode.attachEvent('onchange', subscription.delegate)
          }
        }
      },
      {
        type: 'beforedeactivate',
        delegate () { // can use 'attachEvent()' and 'detachEvent()' on DOM
          let nodeName
          let targetNode
          if ((nodeName = (targetNode = event.srcElement).nodeName.toLowerCase()) === 'select') { // eslint-disable-line
            targetNode.detachEvent('onchange', subscription.delegate)
          } else if (nodeName === 'input') {
            const nodeType = targetNode.type
            if (nodeType === 'text' || nodeType === 'password') {
              if (subscription.value !== targetNode.value) { // no need to remember state of control (it's deactivating)
                targetNode.fireEvent('onchange', document.createEventObject())
              }
            } else if (nodeType === 'radio' || nodeType === 'checkbox') {
              targetNode.detachEvent('onclick', subscription.onclick)
              delete subscription.onclick
            }
            targetNode.detachEvent('onchange', subscription.delegate)
          }
        }
      }
    ]
  }

  return subscription
}

function getFocusSubscription (type, element, selector, handler, context) {
  return {
    type,
    delegate: ((delegate) => () => {
      event.srcElement.detachEvent('onfocus', subscription.delegate) // eslint-disable-line
      return delegate()
    })(delegateManager.create(type, element, selector, handler, context)),
    supplementary: [
      {
        type: 'focusin',
        delegate () { // can use 'attachEvent()' and 'detachEvent()' on DOM
          event.srcElement.attachEvent('onfocus', subscription.delegate) // eslint-disable-line
        }
      }
    ]
  }
}

function getBlurSubscription (type, element, selector, handler, context) {
  return {
    type,
    delegate: ((delegate) => () => {
      event.srcElement.detachEvent('onblur', subscription.delegate) // eslint-disable-line
      return delegate()
    })(delegateManager.create(type, element, selector, handler, context)),
    supplementary: [
      {
        type: 'focusout',
        delegate () { // can use 'attachEvent()' and 'detachEvent()' on DOM
          event.srcElement.attachEvent('onblur', subscription.delegate) // eslint-disable-line
        }
      }
    ]
  }
}

function delegate (type, element, selector, handler, context) {
  let subscription
  switch (type) {
    case 'change':
      subscription = getChangeSubscription(type, element, selector, handler, context)
      break
    case 'focus':
      subscription = getFocusSubscription(type, element, selector, handler, context)
      break
    case 'blur':
      subscription = getBlurSubscription(type, element, selector, handler, context)
      break
    default:
      subscription = {
        type,
        delegate: delegateManager.create(type, element, selector, handler, context)
      }
  }
  delegateManager.attach(type, element, subscription)
  return {
    subscription () { return subscription },
    stop () {
      delegateManager.detach(type, element, subscription)
    }
  }
}

export const subscribe = (
  (FACADE === DELEGATE_WITH_PHASE)
    ? delegateWithPhase
    : (FACADE === DELEGATE)
      ? delegate
      : notSupported)
