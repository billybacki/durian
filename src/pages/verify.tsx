import OtpInput, { useOptVerify } from '@/components/OtpInput'
import { Button, Container } from '@mui/material'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

enum OptInputStatus {
  CODING,
  SUCCESS,
  FAIL,
  WAITING
}

export default function Verify() {
  const navigate = useNavigate()

  const onVerifable = useCallback(() => {
    console.log('verifable to do')
  }, [])
  const onFail = useCallback(() => {
    console.log('fail to do')
  }, [])

  const { optValue, setOptValue, optInputStatus, optRef, VerifySuccessHandle, VerifyFailHandle, VerifyWaitingHandle } =
    useOptVerify({
      onVerifable,
      onFail
    })

  return (
    <Container>
      <Button variant={'contained'} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Button variant={'contained'} onClick={VerifySuccessHandle}>
        Verify Success
      </Button>
      <Button variant={'contained'} onClick={VerifyFailHandle}>
        Verify Fail
      </Button>
      <Button variant={'contained'} onClick={VerifyWaitingHandle}>
        Waiting
      </Button>

      {optInputStatus !== OptInputStatus.WAITING && (
        <OtpInput
          ref={optRef}
          value={optValue}
          onChange={v => {
            setOptValue(v)
          }}
          length={4}
        />
      )}
    </Container>
  )
}

export interface OptHandle {
  handleFail: () => void
}
