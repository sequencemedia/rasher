/* eslint no-cond-assign: 0 */

import {
  Listener
} from './dom/listener'

import {
  Delegate
} from './dom/delegate'

import {
  Query
} from './dom/query'

const stopFactory = (subscription) => () => { subscription.stop() }

const has = (array, index) => (
  typeof index === 'number' /* IS NUMBER */ &&
  !(index < 0) /* LOWER BOUND (index not less than zero) */ &&
  array.length > index /* UPPER BOUND (length more than index) */
)

const stopAll = (subscriptionList) => {
  if (subscriptionList.length === 0) return false
  let subscription
  while (subscription = subscriptionList.shift()) {
    subscription.stop()
  }
  return true
}

const listAll = (subscriptionList) => ({ // get length () { return subscriptionList.length } // old IE safe?
  node: (index) => has(subscriptionList, index) ? subscriptionList[index].node : null,
  type: (index) => has(subscriptionList, index) ? subscriptionList[index].type : null,
  stop: (index) => {
    if (has(subscriptionList, index)) {
      subscriptionList.splice(index, 1).shift().stop()
      return true
    }
    return false
  },
  indexOf: (node) => subscriptionList.findIndex(({ node: n }) => node === n),
  size: () => subscriptionList.length
})

const delegateRasher = () => {
  let delegate
  let query
  let rasher
  return {
    delegate: () => delegate || (delegate = new Delegate()),
    query: () => query || (query = new Query()),
    rasher: () => rasher || (rasher = {
      stopAll,
      listAll
    })
  }
}

const listenerRasher = () => {
  let listener
  let query
  let rasher
  return {
    listener: () => listener || (listener = new Listener()),
    query: () => query || (query = new Query()),
    rasher: () => rasher || (rasher = {
      stopAll,
      listAll
    })
  }
}

const delegateFacade = (rasher, list, node, selector) => ({
  on: (type) => {
    if (typeof type !== 'string') return null
    return {
      do: (handler, { context, phase } = {}) => {
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
})

const listenerFacade = (rasher, list, node) => ({
  on: (type) => {
    if (typeof type !== 'string') return null
    return {
      do: (handler, { context, phase } = {}) => {
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
})

const find = (selector) => ({
  delegateTo: (delegate) => ({
    then: (callOut) => {
      const rasher = delegateRasher()
      const q = rasher.query()
      const k = rasher.rasher()

      if ((callOut || false).constructor !== Function) return { stopAll: () => false, listAll: () => [] }

      const nodeList = q.queryForNodeList(delegate)

      let i = 0
      const j = nodeList.length

      const subscriptionList = [] // always an array

      if (i < j) {
        do {
          const subscriptionNode = nodeList[i]
          const face = delegateFacade(rasher, subscriptionList, subscriptionNode, selector)
          const list = ({ node }) => (subscriptionNode === node)
          const each = (x) => {
            const z = subscriptionList.findIndex((y) => x === y)
            subscriptionList
              .splice(z, 1)
              .shift().stop()
          }
          callOut.call(subscriptionNode, face, {
            node: () => subscriptionNode,
            stop: () => {
              const a = subscriptionList.filter(list)
              if (a.length === 0) return false
              a.forEach(each)
              return true
            },
            index: () => (
              subscriptionList.findIndex(list)
            ),
            size: () => subscriptionList.length
          }, i, j)
        } while ((i = i + 1) < j)
      }

      return {
        stopAll: () => k.stopAll(subscriptionList),
        listAll: () => k.listAll(subscriptionList)
      }
    },
    toArray: () => {
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
  }),
  then: (callOut) => {
    if ((callOut || false).constructor !== Function) return { stopAll: () => false, listAll: () => [] }

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
        const list = ({ node }) => (subscriptionNode === node)
        const each = (x) => {
          const z = subscriptionList.findIndex((y) => x === y)
          subscriptionList
            .splice(z, 1)
            .shift().stop()
        }
        callOut.call(subscriptionNode, face, {
          node: () => subscriptionNode,
          stop: () => {
            const a = subscriptionList.filter(list)
            if (a.length === 0) return false
            a.forEach(each)
            return true
          },
          index: () => (
            subscriptionList.findIndex(list)
          ),
          size: () => subscriptionList.length
        }, i, j)
      } while ((i = i + 1) < j)
    }

    return {
      stopAll: () => k.stopAll(subscriptionList),
      listAll: () => k.listAll(subscriptionList)
    }
  },
  toArray: () => {
    const q = new Query()
    const nodeList = q.queryForNodeList(selector)
    return Array.from(nodeList)
  }
})

export class Rasher {
  find = find
}
