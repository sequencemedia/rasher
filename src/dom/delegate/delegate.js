import {
  FACADE
} from '~/bom/rasher'

import {
  notSupported
} from '~/dom/rasher'

import {
  DelegateManager
} from '~/dom/delegate-manager'

const delegateManager = new DelegateManager()

const delegateWithPhase = (type, element, selector, handler, context, phase = false) => {
  const subscription = {
    delegate: delegateManager.create(type, element, selector, handler, context),
    phase: (type === 'focus' || type === 'blur') ? true : !!phase
  }
  delegateManager.attach(type, element, subscription)
  return {
    stop: () => {
      delegateManager.detach(type, element, subscription)
    }
  }
}

const delegate = (type, element, selector, handler, context) => {
  let subscription
  switch (type) {
    case 'change':
      subscription = {
        type,
        delegate: delegateManager.create(type, element, selector, handler, context),
        supplementary: [
          {
            type: 'beforeactivate',
            delegate: () => { // can use 'attachEvent()' and 'detachEvent()' on DOM
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
            delegate: () => { // can use 'attachEvent()' and 'detachEvent()' on DOM
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
      break
    case 'focus':
      subscription = {
        type,
        delegate: ((delegate) => () => {
          event.srcElement.detachEvent('onfocus', subscription.delegate) // eslint-disable-line
          return delegate.call()
        })(delegateManager.create(type, element, selector, handler, context)),
        supplementary: [
          {
            type: 'focusin',
            delegate: () => { // can use 'attachEvent()' and 'detachEvent()' on DOM
              event.srcElement.attachEvent('onfocus', subscription.delegate) // eslint-disable-line
            }
          }
        ]
      }
      break
    case 'blur':
      subscription = {
        type,
        delegate: ((delegate) => () => {
          event.srcElement.detachEvent('onblur', subscription.delegate) // eslint-disable-line
          return delegate.call()
        })(delegateManager.create(type, element, selector, handler, context)),
        supplementary: [
          {
            type: 'focusout',
            delegate: () => { // can use 'attachEvent()' and 'detachEvent()' on DOM
              event.srcElement.attachEvent('onblur', subscription.delegate) // eslint-disable-line
            }
          }
        ]
      }
      break
    default:
      subscription = {
        type,
        delegate: delegateManager.create(type, element, selector, handler, context)
      }
  }
  delegateManager.attach(type, element, subscription)
  return {
    subscription: () => subscription,
    stop: () => {
      delegateManager.detach(type, element, subscription)
    }
  }
}

export const subscribe = (FACADE === 3)
  ? delegateWithPhase
  : (FACADE === 8)
    ? delegate
    : notSupported
