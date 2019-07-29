import {
  MATCH
} from '~/bom/rasher'

import {
  Query
} from '~/dom/query'

import Sizzle from 'sizzle'

export class Match {
  constructor (query) {
    this.query = query || new Query()
  }

  hasNodeListMatch = (node, nodeList) => (node && nodeList.length > 0) ? nodeList.contains(node) : false

  hasNodeMatch = (MATCH === 2)
    ? (node, selector) => node.matches(selector)
    : (MATCH === 3)
      ? (node, selector) => node.webkitMatchesSelector(selector)
      : (MATCH === 4)
        ? (node, selector) => node.mozMatchesSelector(selector)
        : (MATCH === 5)
          ? (node, selector) => node.msMatchesSelector(selector)
          : (MATCH === 6)
            ? (node, selector) => node.oMatchesSelector(selector)
            : (node, selector) => Sizzle.matchesSelector(node, selector)

  matchNodeInNodeList (node, selector) {
    const nodeList = this.query.queryForNodeList(selector)

    if (nodeList.length > 0) {
      const {
        node: rootNode
      } = this.query

      while (node !== rootNode) {
        if (this.hasNodeListMatch(node, nodeList)) {
          return node
        } else {
          if ((node = node.parentNode || null) === null) {
            return null
          }
        }
      }
    }
    return null
  }

  matchNode (node, selector) {
    const {
      node: rootNode
    } = this.query

    while (node !== rootNode) {
      if (this.hasNodeMatch(node, selector)) {
        return node
      } else {
        if ((node = node.parentNode || null) === null) {
          return null
        }
      }
    }
    return null
  }

  matchFrom = (MATCH < 2)
    ? (node, selector) => this.matchNodeInNodeList(node, selector)
    : (node, selector) => this.matchNode(node, selector)
}
