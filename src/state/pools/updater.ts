import { useUpdatePoolData, useAllPoolData, useAddPoolKeys } from './hooks'
import { useEffect, useMemo } from 'react'
import { useTopPoolAddresses } from 'data/pools/topPools'
import { usePoolDatas } from 'data/pools/poolData'
import { POOL_HIDE } from '../../constants'
import { useActiveNetworkVersion } from 'state/application/hooks'

export default function Updater(): null {
  // updaters
  const [currentNetwork] = useActiveNetworkVersion()
  const updatePoolData = useUpdatePoolData()
  const addPoolKeys = useAddPoolKeys()

  // data
  const allPoolData = useAllPoolData()
  const { loading, error, addresses } = useTopPoolAddresses()

  // add top pools on first load
  useEffect(() => {
    if (addresses && !error && !loading) {
      addPoolKeys(addresses)
    }
  }, [addPoolKeys, addresses, error, loading])

  // load data for pools we need to hide
  useEffect(() => {
    addPoolKeys(POOL_HIDE[currentNetwork.id])
  }, [addPoolKeys, currentNetwork.id])

  // detect for which addresses we havent loaded pool data yet
  const unfetchedPoolAddresses = useMemo(() => {
    return Object.keys(allPoolData).reduce((accum: string[], key) => {
      const poolData = allPoolData[key]
      if (!poolData.data || !poolData.lastUpdated) {
        accum.push(key)
      }
      return accum
    }, [])
  }, [allPoolData])

  // update unloaded pool entries with fetched data
  const { error: poolDataError, loading: poolDataLoading, data: poolDatas } = usePoolDatas(unfetchedPoolAddresses)

  useEffect(() => {
    if (poolDatas && !poolDataError && !poolDataLoading) {
      updatePoolData(Object.values(poolDatas))
    }
  }, [poolDataError, poolDataLoading, poolDatas, updatePoolData])

  return null
}
