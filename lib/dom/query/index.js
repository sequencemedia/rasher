import {
  QUERY,
  MATCH
} from '../../bom/bom'

import Sizzle from 'sizzle'

export class Query {
  constructor (node) {
    this.node = node || document.documentElement
  }

  isAncestorOf = (MATCH > 0)
    ? (node) => (node)
      ? this.node.contains(node)
      : false
    : (node) => (node)
      ? Sizzle.contains(this.node, node)
      : false

  isDescendantOf = (MATCH > 0)
    ? (node) => (node)
      ? node.contains(this.node)
      : false
    : (node) => (node)
      ? Sizzle.contains(node, this.node)
      : false

  isSelectedBy = (MATCH === 2 || MATCH === 7)
    ? (selector) => this.node.matches(selector)
    : (MATCH === 3 || MATCH === 8)
      ? (selector) => this.node.webkitMatchesSelector(selector)
      : (MATCH === 4 || MATCH === 9)
        ? (selector) => this.node.mozMatchesSelector(selector)
        : (MATCH === 5 || MATCH === 10)
          ? (selector) => this.node.msMatchesSelector(selector)
          : (MATCH === 6 || MATCH === 11)
            ? (selector) => this.node.oMatchesSelector(selector)
            : (selector) => Sizzle.matchesSelector(this.node, selector)

  is = (node) => (node === this.node)

  queryForNode = (QUERY > 0)
    ? (selector) => this.node.querySelector(selector)
    : (selector) => Sizzle(selector, this.node, []).shift() || null

  queryForNodeList = (QUERY > 1)
    ? (selector) => this.node.querySelectorAll(selector)
    : (selector) => Sizzle(selector, this.node, [])
}
