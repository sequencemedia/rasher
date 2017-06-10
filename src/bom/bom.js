export const ATTACH = ('addEventListener' in window)
  ? 1
  : ('attachEvent' in window)
    ? 3
    : 0

export const DETACH = ('removeEventListener' in window)
  ? 2
  : ('detachEvent' in window)
    ? 5
    : 0

export const QUERY = ('querySelector' in document.documentElement)
  ? ('querySelectorAll' in document.documentElement)
    ? 3
    : 1
  : 0

export const MATCH = ('contains' in document.documentElement)
  ? ('matches' in document.documentElement)
    ? 2
    : ('webkitMatchesSelector' in document.documentElement)
      ? 3
      : ('mozMatchesSelector' in document.documentElement)
        ? 4
        : ('msMatchesSelector' in document.documentElement)
          ? 5
          : ('oMatchesSelector' in document.documentElement)
            ? 6
            : 1
  : ('matches' in document.documentElement)
    ? 7
    : ('webkitMatchesSelector' in document.documentElement)
      ? 8
      : ('mozMatchesSelector' in document.documentElement)
        ? 9
        : ('msMatchesSelector' in document.documentElement)
          ? 10
          : ('oMatchesSelector' in document.documentElement)
            ? 11
            : 0

export const FACADE = (
  ATTACH + DETACH
)
