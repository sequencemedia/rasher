import {
  NOT_SUPPORTED,

  SUPPORTS_QUERY_SELECTOR,

  SUPPORTS_CONTAINS_MATCHES,
  SUPPORTS_CONTAINS_MATCHES_WK,
  SUPPORTS_CONTAINS_MATCHES_MZ,
  SUPPORTS_CONTAINS_MATCHES_MS,
  SUPPORTS_CONTAINS_MATCHES_OP,

  SUPPORTS_MATCHES,
  SUPPORTS_MATCHES_WK,
  SUPPORTS_MATCHES_MZ,
  SUPPORTS_MATCHES_MS,
  SUPPORTS_MATCHES_OP,

  QUERY,
  MATCH
} from '~/bom/rasher'

import Sizzle from 'sizzle'

export class Query {
  constructor (node) {
    this.node = node || document.documentElement
  }

  isAncestorOf = (
    (MATCH > NOT_SUPPORTED)
      ? (node) => (node)
        ? this.node.contains(node)
        : false
      : (node) => (node)
        ? Sizzle.contains(this.node, node)
        : false)

  isDescendantOf = (
    (MATCH > NOT_SUPPORTED)
      ? (node) => (node)
        ? node.contains(this.node)
        : false
      : (node) => (node)
        ? Sizzle.contains(node, this.node)
        : false)

  isSelectedBy = (
    (MATCH === SUPPORTS_CONTAINS_MATCHES || MATCH === SUPPORTS_MATCHES)
      ? (selector) => this.node.matches(selector)
      : (MATCH === SUPPORTS_CONTAINS_MATCHES_WK || MATCH === SUPPORTS_MATCHES_WK)
        ? (selector) => this.node.webkitMatchesSelector(selector)
        : (MATCH === SUPPORTS_CONTAINS_MATCHES_MZ || MATCH === SUPPORTS_MATCHES_MZ)
          ? (selector) => this.node.mozMatchesSelector(selector)
          : (MATCH === SUPPORTS_CONTAINS_MATCHES_MS || MATCH === SUPPORTS_MATCHES_MS)
            ? (selector) => this.node.msMatchesSelector(selector)
            : (MATCH === SUPPORTS_CONTAINS_MATCHES_OP || MATCH === SUPPORTS_MATCHES_OP)
              ? (selector) => this.node.oMatchesSelector(selector)
              : (selector) => Sizzle.matchesSelector(this.node, selector))

  is = (node) => (node === this.node)

  queryForNode = (QUERY > NOT_SUPPORTED)
    ? (selector) => this.node.querySelector(selector)
    : (selector) => Sizzle(selector, this.node, []).shift() || null

  queryForNodeList = (QUERY > SUPPORTS_QUERY_SELECTOR)
    ? (selector) => this.node.querySelectorAll(selector)
    : (selector) => Sizzle(selector, this.node, [])
}
