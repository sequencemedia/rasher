import {
  Listener
} from './dom/listener'

import {
  Delegate
} from './dom/delegate'

import {
  Query
} from './dom/query'

function stopFactory (subscription) {
  return function stop () {
    subscription.stop()
  }
}

const has = (array, index) => (
  typeof index === 'number' /* IS NUMBER */ &&
  !(index < 0) /* LOWER BOUND (index not less than zero) */ &&
  array.length > index /* UPPER BOUND (length more than index) */
)

function stopAll (subscriptionList) {
  if (subscriptionList.length === 0) return false
  let subscription
  while (subscription = subscriptionList.shift()) {
    subscription.stop()
  }
  return true
}

function listAll (subscriptionList) {
  return { // get length () { return subscriptionList.length } // old IE safe?
    node (index) { return has(subscriptionList, index) ? subscriptionList[index].node : null },
    type (index) { return has(subscriptionList, index) ? subscriptionList[index].type : null },
    stop (index) {
      if (has(subscriptionList, index)) {
        subscriptionList.splice(index, 1).shift().stop()
        return true
      }
      return false
    },
    indexOf (node) { return subscriptionList.findIndex(({ node: n }) => node === n) },
    size () { return subscriptionList.length }
  }
}

function delegateRasher () {
  let delegate
  let query
  let rasher
  return {
    delegate () { return delegate || (delegate = new Delegate()) },
    query () { return query || (query = new Query()) },
    rasher () {
      return rasher || (rasher = {
        stopAll,
        listAll
      })
    }
  }
}

function listenerRasher () {
  let listener
  let query
  let rasher
  return {
    listener () { return listener || (listener = new Listener()) },
    query () { return query || (query = new Query()) },
    rasher () {
      return rasher || (rasher = {
        stopAll,
        listAll
      })
    }
  }
}

function delegateFacade (rasher, list, node, selector) {
  return {
    on (type) {
      if (typeof type !== 'string') return null

      /* Else */

      return {
        do (handler, { context, phase } = {}) {
          if ((handler || false).constructor !== Function) return null

          const delegate = rasher.delegate()

          list.push({
            type,
            node,
            stop: stopFactory(
              delegate.subscribe(type, node, selector, handler, context, phase)
            )
          })
        }
      }
    }
  }
}

function listenerFacade (rasher, list, node) {
  return {
    on (type) {
      if (typeof type !== 'string') return null

      /* Else */

      return {
        do (handler, { context, phase } = {}) {
          if ((handler || false).constructor !== Function) return null

          const listener = rasher.listener()

          list.push({
            type,
            node,
            stop: stopFactory(
              listener.subscribe(type, node, handler, context, phase)
            )
          })
        }
      }
    }
  }
}

export function find (selector) {
  return {
    delegateTo (delegate) {
      return {
        then (callOut) { /* If no `callOut` */
          if ((callOut || false).constructor !== Function) {
            return {
              stopAll () { return false },
              listAll () { return [] }
            }
          }

          /* Else */

          const rasher = delegateRasher()
          const q = rasher.query()
          const k = rasher.rasher()

          const nodeList = q.queryForNodeList(delegate)

          let i = 0
          const j = nodeList.length

          const subscriptionList = [] // always an array

          if (i < j) {
            do {
              const subscriptionNode = nodeList[i]
              const face = delegateFacade(rasher, subscriptionList, subscriptionNode, selector)
              const list = ({ node } = {}) => (subscriptionNode === node)
              const each = (x) => {
                const z = subscriptionList.findIndex((y) => x === y)
                subscriptionList
                  .splice(z, 1)
                  .shift().stop()
              }
              callOut.call(subscriptionNode, face, {
                node () { return subscriptionNode },
                stop () {
                  const a = subscriptionList.filter(list)
                  if (a.length === 0) return false
                  a.forEach(each)
                  return true
                },
                index () { return subscriptionList.findIndex(list) },
                size () { return subscriptionList.length }
              }, i, j)
            } while ((i = i + 1) < j)
          }

          return {
            stopAll () { return k.stopAll(subscriptionList) },
            listAll () { return k.listAll(subscriptionList) }
          }
        },
        toArray () {
          const q = new Query()

          return (
            Array
              .from(
                q.queryForNodeList(selector)
              )
              .concat(
                Array
                  .from(
                    q.queryForNodeList(delegate)
                  )
              )
          )
        }
      }
    },
    then (callOut) { /* If no `callOut` */
      if ((callOut || false).constructor !== Function) {
        return {
          stopAll () { return false },
          listAll () { return [] }
        }
      }

      /* Else */

      const rasher = listenerRasher()
      const q = rasher.query()
      const k = rasher.rasher()

      const nodeList = q.queryForNodeList(selector)

      let i = 0
      const j = nodeList.length

      const subscriptionList = [] // always an array

      if (i < j) {
        do {
          const subscriptionNode = nodeList[i]
          const face = listenerFacade(rasher, subscriptionList, subscriptionNode)
          const list = ({ node } = {}) => (subscriptionNode === node)
          const each = (x) => {
            const z = subscriptionList.findIndex((y) => x === y)
            subscriptionList
              .splice(z, 1)
              .shift().stop()
          }
          callOut.call(subscriptionNode, face, {
            node () { return subscriptionNode },
            stop () {
              const a = subscriptionList.filter(list)
              if (a.length === 0) return false
              a.forEach(each)
              return true
            },
            index () { return subscriptionList.findIndex(list) },
            size () { return subscriptionList.length }
          }, i, j)
        } while ((i = i + 1) < j)
      }

      return {
        stopAll () { return k.stopAll(subscriptionList) },
        listAll () { return k.listAll(subscriptionList) }
      }
    },
    toArray () {
      const q = new Query()
      const nodeList = q.queryForNodeList(selector)
      return Array.from(nodeList)
    }
  }
}

export default class Rasher {
  find = find
}
