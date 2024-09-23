import { useRequest } from 'ahooks'
import { useTonClient } from './useTonClient'
import { Address } from '@ton/core'
import { JettonWallet } from '@ton/ton'
import { CurrencyAmount } from '@/constants/token/currencyAmount'
import { useJettonMasterData, useUserJettonWallet } from './useJetton'
import { useMemo } from 'react'
import { Currency } from '@/constants/token/currency'
import { useBlockNumber } from '@/provider/BlockSSEProvider'

export function useTonBalance(address?: string) {
  const client = useTonClient()
  const block = useBlockNumber()

  const { data: balance } = useRequest(
    async () => {
      if (!client || !address) return undefined
      const res = await client.getBalance(Address.parse(address))
      return CurrencyAmount.ether(res.toString())
    },
    {
      ready: !!client && !!address,
      cacheKey: `useTonBalance-${address}`,
      staleTime: 5_000,
      refreshDeps: [client, address, block]
    }
  )

  return balance
}

export function useJettonBalance(jettonMasterContract: string) {
  const client = useTonClient()
  const userJWA = useUserJettonWallet(jettonMasterContract)
  const jettonMasterData = useJettonMasterData(jettonMasterContract)
  const block = useBlockNumber()

  const { data: rawBalance } = useRequest(
    async () => {
      if (!client || !userJWA) return undefined
      const contract = JettonWallet.create(userJWA)

      const data = await contract.getBalance(client.provider(contract.address))

      return data?.toString()
    },
    {
      ready: !!client && !!userJWA,
      cacheKey: `useJettonBalance-${userJWA}`,
      staleTime: 5_000,
      refreshDeps: [client, userJWA, block]
    }
  )

  const balance = useMemo(() => {
    if (!jettonMasterData || !rawBalance) return undefined
    const metadata = jettonMasterData.metadata
    const currency = new Currency(
      metadata.address,
      Number(metadata.decimals),
      metadata.symbol,
      metadata.name,
      metadata.image
    )
    return new CurrencyAmount(currency, rawBalance)
  }, [jettonMasterData, rawBalance])

  return { rawBalance, balance }
}
