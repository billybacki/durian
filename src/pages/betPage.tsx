import Input from '@/components/Input'
import KeyboardWrapper from '@/components/NumberPad'
import { Button, Container, Stack } from '@mui/material'
import { ChangeEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BetPage() {
  const navigate = useNavigate()

  const [input, setInput] = useState('')
  const keyboard = useRef<any>(null)

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value
    setInput(input)
    keyboard.current.setInput(input)
  }

  return (
    <Container maxWidth="lg">
      <Button variant={'contained'} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Stack gap={20}>
        <Input
          readOnly
          value={input}
          placeholder={'Tap on the virtual keyboard to start'}
          onChange={e => onChangeInput(e)}
        />
        <KeyboardWrapper keyboardRef={keyboard} onChange={setInput} />
      </Stack>
    </Container>
  )
}
