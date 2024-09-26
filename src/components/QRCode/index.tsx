import { Box, styled } from '@mui/material'
import { QRCodeSVG } from 'qrcode.react'

const QRCodeContainer = styled(Box)`
  padding: 8px;
  border-radius: 6.72px;
  background: #fff;
`

export default function QRCodeBox({ value, size }: { value: string; size: number }) {
  return (
    <QRCodeContainer>
      <QRCodeSVG value={value} size={size} />
    </QRCodeContainer>
  )
}
