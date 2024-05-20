import { useState, useEffect } from 'react'

// endpoint to check asset exists
const cmcEndpoint = 'https://ledger.minesidra.com/api/v2/tokens/'

/**
 * Check if asset exists on CMC, if exists
 * return  url, if not return undefined
 * @param address token address
 */
export function useCMCLink(address: string): string | undefined {
  const [link, setLink] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function fetchLink() {
      const result = await fetch(cmcEndpoint + address)
      // if link exists, format the url
      if (result.status === 200) {
        setLink('https://ledger.minesidra.com/token/' + address)
      }
    }
    if (address) {
      fetchLink()
    }
  }, [address])

  return link
}
