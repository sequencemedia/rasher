"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = void 0;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _rasher = require("../../bom/rasher");
var _rasher2 = require("../rasher");
var _delegateManager = _interopRequireDefault(require("../delegate-manager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var DELEGATE_WITH_PHASE = _rasher.SUPPORTS_ADD + _rasher.SUPPORTS_REMOVE;
var DELEGATE = _rasher.SUPPORTS_ATTACH + _rasher.SUPPORTS_DETACH;
var DELEGATE_MANAGER = new _delegateManager.default();
function delegateWithPhase(type, element, selector, handler, context) {
  var phase = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var subscription = {
    delegate: DELEGATE_MANAGER.create(type, element, selector, handler, context),
    phase: type === 'focus' || type === 'blur' ? true : !!phase
  };
  DELEGATE_MANAGER.attach(type, element, subscription);
  return {
    stop: function stop() {
      DELEGATE_MANAGER.detach(type, element, subscription);
    }
  };
}
function getChangeSubscription(type, element, selector, handler, context) {
  var subscription = {
    type: type,
    delegate: DELEGATE_MANAGER.create(type, element, selector, handler, context),
    supplementary: [{
      type: 'beforeactivate',
      delegate: function delegate() {
        // can use 'attachEvent()' and 'detachEvent()' on DOM
        var nodeName;
        var targetNode;
        if ((nodeName = (targetNode = event.srcElement).nodeName.toLowerCase()) === 'select') {
          // eslint-disable-line
          targetNode.attachEvent('onchange', subscription.delegate);
        } else if (nodeName === 'input') {
          var nodeType = targetNode.type;
          if (nodeType === 'text' || nodeType === 'password') {
            subscription.value = targetNode.value;
          } else if (nodeType === 'radio' || nodeType === 'checkbox') {
            subscription.checked = targetNode.checked;
            targetNode.attachEvent('onclick', subscription.onclick = function () {
              if (targetNode.checked !== subscription.checked) {
                subscription.checked = targetNode.checked; // remember state of control for additional clicks (deactivate will remove the handler)
                targetNode.fireEvent('onchange', document.createEventObject());
              }
            });
          }
          targetNode.attachEvent('onchange', subscription.delegate);
        }
      }
    }, {
      type: 'beforedeactivate',
      delegate: function delegate() {
        // can use 'attachEvent()' and 'detachEvent()' on DOM
        var nodeName;
        var targetNode;
        if ((nodeName = (targetNode = event.srcElement).nodeName.toLowerCase()) === 'select') {
          // eslint-disable-line
          targetNode.detachEvent('onchange', subscription.delegate);
        } else if (nodeName === 'input') {
          var nodeType = targetNode.type;
          if (nodeType === 'text' || nodeType === 'password') {
            if (subscription.value !== targetNode.value) {
              // no need to remember state of control (it's deactivating)
              targetNode.fireEvent('onchange', document.createEventObject());
            }
          } else if (nodeType === 'radio' || nodeType === 'checkbox') {
            targetNode.detachEvent('onclick', subscription.onclick);
            delete subscription.onclick;
          }
          targetNode.detachEvent('onchange', subscription.delegate);
        }
      }
    }]
  };
  return subscription;
}
function getFocusSubscription(type, element, selector, handler, context) {
  return {
    type: type,
    delegate: function (delegate) {
      return function () {
        event.srcElement.detachEvent('onfocus', subscription.delegate); // eslint-disable-line
        return delegate();
      };
    }(DELEGATE_MANAGER.create(type, element, selector, handler, context)),
    supplementary: [{
      type: 'focusin',
      delegate: function delegate() {
        // can use 'attachEvent()' and 'detachEvent()' on DOM
        event.srcElement.attachEvent('onfocus', subscription.delegate); // eslint-disable-line
      }
    }]
  };
}
function getBlurSubscription(type, element, selector, handler, context) {
  return {
    type: type,
    delegate: function (delegate) {
      return function () {
        event.srcElement.detachEvent('onblur', subscription.delegate); // eslint-disable-line
        return delegate();
      };
    }(DELEGATE_MANAGER.create(type, element, selector, handler, context)),
    supplementary: [{
      type: 'focusout',
      delegate: function delegate() {
        // can use 'attachEvent()' and 'detachEvent()' on DOM
        event.srcElement.attachEvent('onblur', subscription.delegate); // eslint-disable-line
      }
    }]
  };
}
function delegate(type, element, selector, handler, context) {
  var subscription;
  switch (type) {
    case 'change':
      subscription = getChangeSubscription(type, element, selector, handler, context);
      break;
    case 'focus':
      subscription = getFocusSubscription(type, element, selector, handler, context);
      break;
    case 'blur':
      subscription = getBlurSubscription(type, element, selector, handler, context);
      break;
    default:
      subscription = {
        type: type,
        delegate: DELEGATE_MANAGER.create(type, element, selector, handler, context)
      };
  }
  DELEGATE_MANAGER.attach(type, element, subscription);
  return {
    subscription: function (_subscription) {
      function subscription() {
        return _subscription.apply(this, arguments);
      }
      subscription.toString = function () {
        return _subscription.toString();
      };
      return subscription;
    }(function () {
      return subscription;
    }),
    stop: function stop() {
      DELEGATE_MANAGER.detach(type, element, subscription);
    }
  };
}
var subscribe = exports.subscribe = _rasher.FACADE === DELEGATE_WITH_PHASE ? delegateWithPhase : _rasher.FACADE === DELEGATE ? delegate : _rasher2.notSupported;