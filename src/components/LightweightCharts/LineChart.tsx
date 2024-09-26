import { ColorType, createChart, CrosshairMode, IPriceLine, ISeriesApi, UTCTimestamp } from 'lightweight-charts'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { Button } from '@mui/material'

export interface ChartData {
  time: UTCTimestamp
  value: number
}

export default function LineChart({
  wssData,
  historyData,
  height = 360
}: {
  wssData: ChartData | undefined
  historyData: ChartData[] | undefined
  height?: number | string
}) {
  const chartContainer = useRef<HTMLDivElement | null>(null)
  const series = useRef<ISeriesApi<'Line'> | null>(null)
  const chart = useRef<any>(null)
  const initData = useRef(false)

  const [isUp, setIsUp] = useState(true)
  const styleColor = useMemo(() => (isUp ? '#1CE33D' : '#E66215'), [isUp])
  const priceLines = useRef<IPriceLine[]>([])

  const chartOptions = useMemo(() => {
    if (chartContainer.current && chart.current) {
      return {
        width: chartContainer.current.clientWidth,
        height: chartContainer.current.clientHeight,
        layout: {
          textColor: '#7C7E80',
          background: { type: ColorType.Solid, color: 'transparent' },
          attributionLogo: false
        },
        grid: {
          vertLines: {
            visible: false
          },
          horzLines: {
            visible: false
          }
        },
        timeScale: {
          tickMarkFormatter: (time: UTCTimestamp) => {
            return dayjs(time).format('HH:mm:ss')
          }
        },
        crosshair: {
          vertLine: {
            color: styleColor,
            labelVisible: false
          },
          horzLine: {
            color: styleColor,
            labelBackgroundColor: styleColor
          },
          mode: CrosshairMode.Magnet
        },
        handleScale: {
          axisPressedMouseMove: {
            time: false,
            price: false
          }
        }
      }
    } else {
      return {}
    }
  }, [styleColor])

  useEffect(() => {
    if (chartContainer.current && !chart.current) {
      chart.current = createChart(chartContainer.current, {
        width: chartContainer.current.clientWidth,
        height: chartContainer.current.clientHeight,
        layout: {
          textColor: '#7C7E80',
          background: { type: ColorType.Solid, color: 'transparent' },
          attributionLogo: false
        },
        grid: {
          vertLines: {
            visible: false
          },
          horzLines: {
            visible: false
          }
        },
        timeScale: {
          tickMarkFormatter: (time: UTCTimestamp) => {
            return dayjs(time).format('HH:mm:ss')
          }
        },
        crosshair: {
          vertLine: {
            color: styleColor,
            labelVisible: false
          },
          horzLine: {
            color: styleColor,
            labelBackgroundColor: styleColor
          },
          mode: CrosshairMode.Magnet
        }
      })
      series.current = chart.current.addLineSeries({
        color: styleColor,
        lineWidth: 1
      })
    }
  }, [styleColor])

  useEffect(() => {
    if (!initData.current && historyData && series.current) {
      series.current.setData(historyData)
      initData.current = true
      chart.current?.timeScale().scrollToPosition(20, false)
    }
  }, [historyData])

  useEffect(() => {
    if (series.current && wssData && initData.current) {
      series.current.update(wssData)
      chart.current?.applyOptions(chartOptions)
      series.current?.applyOptions({
        color: styleColor,
        lineWidth: 1
      })
    }
  }, [chartOptions, styleColor, wssData])

  const removeBetLine = useCallback(() => {
    priceLines.current.forEach(priceLine => {
      series.current?.removePriceLine(priceLine)
    })
    priceLines.current = []
  }, [])

  const showBetLine = useCallback(() => {
    if (!historyData || !series.current) return
    const lastDataPoint = historyData[historyData.length - 1]

    priceLines.current.push(
      series.current.createPriceLine({
        id: '#you',
        price: lastDataPoint.value - 1,
        color: '#FFF',
        lineWidth: 1,
        lineStyle: 1,
        axisLabelVisible: true,
        title: 'you'
      })
    )

    priceLines.current.push(
      series.current.createPriceLine({
        id: '#bust',
        price: lastDataPoint.value - 2,
        color: '#E66215',
        lineWidth: 1,
        lineStyle: 1,
        axisLabelVisible: true,
        title: 'bust'
      })
    )
  }, [historyData])

  return (
    <>
      <Button variant="contained" onClick={() => setIsUp(!isUp)}>
        changeUp
      </Button>
      <Button variant="contained" onClick={showBetLine}>
        showRes
      </Button>
      <Button variant="contained" onClick={removeBetLine}>
        removeBetLine
      </Button>
      <div style={{ width: '100%', height: height }} ref={chartContainer} />
    </>
  )
}
