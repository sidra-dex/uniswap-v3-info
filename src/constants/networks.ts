export enum SupportedNetwork {
  SIDRACHIAN,
}

export enum ChainId {
  SIDRACHIAN = 97454,
}

export const SUPPORTED_CHAINS = [ChainId.SIDRACHIAN]

export type NetworkInfo = {
  chainId: ChainId
  id: SupportedNetwork
  route: string
  name: string
  imageURL: string
  bgColor: string
  primaryColor: string
  secondaryColor: string
}

export const SidrachianNetworkInfo: NetworkInfo = {
  chainId: ChainId.SIDRACHIAN,
  id: SupportedNetwork.SIDRACHIAN,
  route: '',
  name: 'Sidra Chain',
  bgColor: '#fc077d',
  primaryColor: '#fc077d',
  secondaryColor: '#2172E5',
  imageURL: 'https://www.sidrachain.com/icons/ios/100.png',
}

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [SidrachianNetworkInfo]
