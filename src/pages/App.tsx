import React, { Suspense, useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Home from './Home'
import PoolsOverview from './Pool/PoolsOverview'
import TokensOverview from './Token/TokensOverview'
import TopBar from 'components/Header/TopBar'
import { RedirectInvalidToken } from './Token/redirects'
import { LocalLoader } from 'components/Loader'
import PoolPage from './Pool/PoolPage'
import { ExternalLink, TYPE } from 'theme'
import { useActiveNetworkVersion, useSubgraphStatus } from 'state/application/hooks'
import { DarkGreyCard } from 'components/Card'
import { SUPPORTED_NETWORK_VERSIONS, SidrachianNetworkInfo } from 'constants/networks'
// import { Link } from 'rebass'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow-x: hidden;
  min-height: 100vh;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  width: 100%;
  position: fixed;
  justify-content: space-between;
  z-index: 2;
`

const BodyWrapper = styled.div<{ $warningActive?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 40px;
  margin-top: ${({ $warningActive }) => ($warningActive ? '140px' : '100px')};
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;

  > * {
    max-width: 1200px;
  }

  @media (max-width: 1080px) {
    padding-top: 2rem;
    margin-top: 140px;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const Hide1080 = styled.div`
  @media (max-width: 1080px) {
    display: none;
  }
`

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.red3};
`

const WarningBanner = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 1rem;
  color: white;
  font-size: 14px;
  width: 100%;
  text-align: center;
  font-weight: 500;
`

// const UrlBanner = styled.div`
//   background-color: ${({ theme }) => theme.pink1};
//   padding: 1rem 0.75rem;
//   color: white;
//   font-size: 14px;
//   width: 100%;
//   text-align: center;
//   font-weight: 500;
// `

// const Decorator = styled.span`
//   text-decoration: underline;
//   color: white;
// `

const BLOCK_DIFFERENCE_THRESHOLD = 30

export default function App() {
  // pretend load buffer
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1300)
  }, [])

  // update network based on route
  // TEMP - find better way to do this
  const location = useLocation()
  const [activeNetwork, setActiveNetwork] = useActiveNetworkVersion()
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveNetwork(SidrachianNetworkInfo)
    } else {
      SUPPORTED_NETWORK_VERSIONS.map((n) => {
        if (location.pathname.includes(n.route.toLocaleLowerCase())) {
          setActiveNetwork(n)
        }
      })
    }
  }, [location.pathname, setActiveNetwork])

  // subgraph health
  const [subgraphStatus] = useSubgraphStatus()

  const showNotSyncedWarning =
    subgraphStatus.headBlock && subgraphStatus.syncedBlock && activeNetwork !== SidrachianNetworkInfo
      ? subgraphStatus.headBlock - subgraphStatus.syncedBlock > BLOCK_DIFFERENCE_THRESHOLD
      : false

  return (
    <Suspense fallback={null}>
      <DarkModeQueryParamReader />
      {loading ? (
        <LocalLoader fill={true} />
      ) : (
        <AppWrapper>
          <URLWarning />
          <HeaderWrapper>
            {showNotSyncedWarning && (
              <BannerWrapper>
                <WarningBanner>
                  {`Warning:
                  Data has only synced to  block ${subgraphStatus.syncedBlock} (out of ${subgraphStatus.headBlock}). Please check back soon.`}
                </WarningBanner>
              </BannerWrapper>
            )}
            <BannerWrapper>Warning: This is a testnet version of the site. Values are not real.</BannerWrapper>
            <Hide1080>
              <TopBar />
            </Hide1080>
            <Header />
          </HeaderWrapper>
          {subgraphStatus.available === false ? (
            <AppWrapper>
              <BodyWrapper>
                <DarkGreyCard style={{ maxWidth: '340px' }}>
                  <TYPE.label>
                    The Graph hosted network which provides data for this site is temporarily experiencing issues. Check
                    current status{' '}
                    <ExternalLink href="https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3">
                      here.
                    </ExternalLink>
                  </TYPE.label>
                </DarkGreyCard>
              </BodyWrapper>
            </AppWrapper>
          ) : (
            <BodyWrapper $warningActive={showNotSyncedWarning}>
              <Popups />
              <Routes>
                <Route path="/:networkID?/pools/:address" element={<PoolPage />} />
                <Route path="/:networkID?/pools" element={<PoolsOverview />} />
                <Route path="/:networkID?/tokens/:address" element={<RedirectInvalidToken />} />
                <Route path="/:networkID?/tokens" element={<TokensOverview />} />
                <Route path="/:networkID?" element={<Home />} />
              </Routes>
              <Marginer />
            </BodyWrapper>
          )}
        </AppWrapper>
      )}
    </Suspense>
  )
}
