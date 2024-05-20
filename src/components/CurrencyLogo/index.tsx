import React, { useMemo } from 'react'
import styled from 'styled-components'
import { isAddress } from 'utils'
import Logo from '../Logo'
import { useActiveNetworkVersion } from 'state/application/hooks'
import { ChainId } from 'constants/networks'

export function chainIdToNetworkName(networkId: ChainId) {
  switch (networkId) {
    case ChainId.SIDRACHIAN:
      return 'mainnet'
  }
}

const getTokenLogoURL = ({ address, chainId }: { address: string; chainId: ChainId }) => {
  // return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/${chainIdToNetworkName(
  //   chainId,
  // )}/assets/${address}/logo.png`
  return `/images/100.png?id=${chainIdToNetworkName(chainId)}&address=${address}`
}

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text4};
`

export default function CurrencyLogo({
  address,
  size = '24px',
  style,
  ...rest
}: {
  address?: string
  size?: string
  style?: React.CSSProperties
}) {
  const [activeNetwork] = useActiveNetworkVersion()

  const srcs: string[] = useMemo(() => {
    const checkSummed = isAddress(address)

    if (checkSummed && address) {
      return [getTokenLogoURL({ address: checkSummed, chainId: activeNetwork.chainId })]
    }
    return []
  }, [address, activeNetwork.chainId])

  return <StyledLogo size={size} srcs={srcs} alt={'token logo'} style={style} {...rest} />
}
