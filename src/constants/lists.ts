// used to mark unsupported tokens, these are hosted lists of unsupported tokens

export const UNSUPPORTED_LIST_URLS: string[] = []
export const SIDRACHIAN_LIST = 'https://swap.xsidra.com/api/tokens.json'
// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  SIDRACHIAN_LIST,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [SIDRACHIAN_LIST]
