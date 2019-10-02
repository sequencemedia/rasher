export const NOT_SUPPORTED = 0
export const NOT_RECOGNISED = 1

export const SUPPORTS_ADD = 1
export const SUPPORTS_REMOVE = 2

export const SUPPORTS_ATTACH = 3
export const SUPPORTS_DETACH = 4

export const SUPPORTS_QUERY_SELECTOR = 1
export const SUPPORTS_QUERY_SELECTOR_ALL = 2

export const SUPPORTS_CONTAINS_MATCHES = 2
export const SUPPORTS_CONTAINS_MATCHES_WK = 3
export const SUPPORTS_CONTAINS_MATCHES_MZ = 4
export const SUPPORTS_CONTAINS_MATCHES_MS = 5
export const SUPPORTS_CONTAINS_MATCHES_OP = 6

export const SUPPORTS_MATCHES = 7
export const SUPPORTS_MATCHES_WK = 8
export const SUPPORTS_MATCHES_MZ = 9
export const SUPPORTS_MATCHES_MS = 10
export const SUPPORTS_MATCHES_OP = 11

export const ATTACH = (
  ('addEventListener' in window)
    ? SUPPORTS_ADD
    : ('attachEvent' in window)
      ? SUPPORTS_ATTACH
      : NOT_SUPPORTED)

export const DETACH = (
  ('removeEventListener' in window)
    ? SUPPORTS_REMOVE
    : ('detachEvent' in window)
      ? SUPPORTS_DETACH
      : NOT_SUPPORTED)

export const QUERY = (
  ('querySelector' in document.documentElement)
    ? ('querySelectorAll' in document.documentElement)
      ? SUPPORTS_QUERY_SELECTOR_ALL
      : SUPPORTS_QUERY_SELECTOR
    : NOT_SUPPORTED)

export const MATCH = (
  ('contains' in document.documentElement)
    ? ('matches' in document.documentElement)
      ? SUPPORTS_CONTAINS_MATCHES
      : ('webkitMatchesSelector' in document.documentElement)
        ? SUPPORTS_CONTAINS_MATCHES_WK
        : ('mozMatchesSelector' in document.documentElement)
          ? SUPPORTS_CONTAINS_MATCHES_MZ
          : ('msMatchesSelector' in document.documentElement)
            ? SUPPORTS_CONTAINS_MATCHES_MS
            : ('oMatchesSelector' in document.documentElement)
              ? SUPPORTS_CONTAINS_MATCHES_OP
              : NOT_RECOGNISED
    : ('matches' in document.documentElement)
      ? SUPPORTS_MATCHES
      : ('webkitMatchesSelector' in document.documentElement)
        ? SUPPORTS_MATCHES_WK
        : ('mozMatchesSelector' in document.documentElement)
          ? SUPPORTS_MATCHES_MZ
          : ('msMatchesSelector' in document.documentElement)
            ? SUPPORTS_MATCHES_MS
            : ('oMatchesSelector' in document.documentElement)
              ? SUPPORTS_MATCHES_OP
              : NOT_SUPPORTED)

export const FACADE = (ATTACH + DETACH)
