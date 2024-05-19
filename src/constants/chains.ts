import { SupportedChainsType } from '@uniswap/sdk-core'

import { ChainId, SUPPORTED_CHAINS } from 'constants/networks'

export const CHAIN_IDS_TO_NAMES = {
  [ChainId.SIDRACHIAN]: 'mainnet',
} as const

// TODO: include BASE_GOERLI when routing is implemented
export type SupportedInterfaceChain = Exclude<SupportedChainsType, ChainId.SIDRACHIAN>

export function isSupportedChain(
  chainId: number | null | undefined | ChainId,
  featureFlags?: Record<number, boolean>,
): chainId is SupportedInterfaceChain {
  if (featureFlags && chainId && chainId in featureFlags) {
    return featureFlags[chainId]
  }
  return !!chainId && SUPPORTED_CHAINS.indexOf(chainId) !== -1
}

export function asSupportedChain(
  chainId: number | null | undefined | ChainId,
  featureFlags?: Record<number, boolean>,
): SupportedInterfaceChain | undefined {
  if (!chainId) return undefined
  if (featureFlags && chainId in featureFlags && !featureFlags[chainId]) {
    return undefined
  }
  return isSupportedChain(chainId) ? chainId : undefined
}

export const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [ChainId.SIDRACHIAN] as const

/**
 * Supported networks for V2 pool behavior.
 */
export const SUPPORTED_V2POOL_CHAIN_IDS = [] as const

export const TESTNET_CHAIN_IDS = [ChainId.SIDRACHIAN] as const

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [ChainId.SIDRACHIAN] as const

export type SupportedL1ChainId = (typeof L1_CHAIN_IDS)[number]

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
export const L2_CHAIN_IDS = [] as const

export type SupportedL2ChainId = (typeof L2_CHAIN_IDS)[number]

/**
 * Get the priority of a chainId based on its relevance to the user.
 * @param {ChainId} chainId - The chainId to determine the priority for.
 * @returns {number} The priority of the chainId, the lower the priority, the earlier it should be displayed, with base of MAINNET=0.
 */
export function getChainPriority(chainId: ChainId): number {
  switch (chainId) {
    case ChainId.SIDRACHIAN:
      return 0
    default:
      return 8
  }
}

export function isUniswapXSupportedChain(chainId: number) {
  return chainId !== ChainId.SIDRACHIAN
}
