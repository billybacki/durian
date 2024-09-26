import LineChart, { ChartData } from '@/components/LightweightCharts/LineChart'
import { Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRequest, useWebSocket } from 'ahooks'
import { useEffect, useMemo, useState } from 'react'
import { UTCTimestamp } from 'lightweight-charts'

interface BinanceWssData {
  E: number
  e: string
  k: {
    t: number
    c: string
  }
  s: string
}

const WSS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@kline_1s'
const HTTPS_URL = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1s'

export default function ChartPage() {
  const navigate = useNavigate()

  const { latestMessage, disconnect } = useWebSocket(WSS_URL)

  const latestMessageData = useMemo(() => {
    if (latestMessage?.data) return JSON.parse(latestMessage.data) as BinanceWssData
    else return undefined
  }, [latestMessage])

  const wssData = useMemo(() => {
    if (latestMessageData) {
      return {
        time: latestMessageData.E as UTCTimestamp,
        value: Number(latestMessageData.k.c)
      }
    } else return undefined
  }, [latestMessageData])

  const [historyData, setHistoryData] = useState<ChartData[] | undefined>(undefined)

  useRequest(async () => {
    const req = await fetch(HTTPS_URL)
    const res = await req.json()
    setHistoryData(
      res.map((item: any) => {
        return {
          time: item[0] as UTCTimestamp,
          value: Number(item[1])
        }
      })
    )
  }, {})

  useEffect(() => {
    return () => disconnect()
  }, [disconnect])

  return (
    <Container maxWidth="lg">
      <Button variant={'contained'} onClick={() => navigate(-1)}>
        Back
      </Button>
      <LineChart wssData={wssData} historyData={historyData} />
    </Container>
  )
}
