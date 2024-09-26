import { Stack, styled } from '@mui/material'
import { Fragment, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Input as BaseInput } from '@mui/base/Input'

const InputElement = styled('input')(({ theme }) => ({
  width: 64,
  height: 64,
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 1.2,
  textAlign: 'center',
  borderRadius: 12,
  background: '#fff',
  padding: 9,
  color: '#0A090D',
  border: '1.2px solid #DADADA',

  '&:focus': {
    border: '2.4px solid var(--ps-brand, rgba(241, 215, 84, 1))'
  },
  '&:focus-visible': {
    outline: 0
  },
  '&.shake': {
    animation: 'shake 0.3s',
    border: '2.4px solid #FF4138'
  },
  '@keyframes shake': {
    '0%': {
      transform: 'translateX(0)'
    },
    '25%': {
      transform: 'translateX(-5px)'
    },
    '50%': {
      transform: 'translateX(5px)'
    },
    '75%': {
      transform: 'translateX(-5px)'
    },
    '100%': {
      transform: 'translateX(0)'
    }
  },

  '::selection': {
    background: 'transparent'
  },

  [theme.breakpoints.down('md')]: {
    width: 64,
    height: 64,
    fontSize: 20,
    padding: '24px 16px'
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  },
  '&': {
    '-moz-appearance': 'textfield'
  }
}))

function OTP(
  {
    separator,
    length,
    value,
    onChange
  }: {
    separator?: React.ReactNode
    length: number
    value: string
    onChange: React.Dispatch<React.SetStateAction<string>>
  },
  ref: any
) {
  const inputRefs = useRef<HTMLInputElement[]>(new Array(length).fill(null))
  const [shake, setShake] = useState(false)

  useImperativeHandle(ref, () => ({
    handleFail
  }))

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex]
    targetInput.focus()
  }

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex]
    targetInput.select()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault()
        break
      case 'ArrowLeft':
        event.preventDefault()
        if (currentIndex > 0) {
          focusInput(currentIndex - 1)
          selectInput(currentIndex - 1)
        }
        break
      case 'ArrowRight':
        event.preventDefault()
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1)
          selectInput(currentIndex + 1)
        }
        break
      case 'Delete':
        event.preventDefault()
        onChange(prevOtp => {
          const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1)
          return otp
        })

        break
      case 'Backspace':
        event.preventDefault()
        if (currentIndex > 0) {
          focusInput(currentIndex - 1)
          selectInput(currentIndex - 1)
        }

        onChange(prevOtp => {
          const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1)
          return otp
        })
        break

      default:
        break
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
    const currentValue = event.target.value
    const regex = /^\d*$/

    if (regex.test(currentValue)) {
      let indexToEnter = 0

      while (indexToEnter <= currentIndex) {
        if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
          indexToEnter += 1
        } else {
          break
        }
      }
      onChange(prev => {
        const otpArray = prev.split('')
        const lastValue = currentValue[currentValue.length - 1]
        otpArray[indexToEnter] = lastValue
        return otpArray.join('')
      })
      if (currentValue !== '') {
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1)
        }
      }
    }
  }

  const handleClick = (_event: React.MouseEvent<HTMLInputElement, MouseEvent>, currentIndex: number) => {
    selectInput(currentIndex)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, currentIndex: number) => {
    event.preventDefault()
    const clipboardData = event.clipboardData

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain')
      pastedText = pastedText.substring(0, length).trim()
      let indexToEnter = 0

      while (indexToEnter <= currentIndex) {
        if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
          indexToEnter += 1
        } else {
          break
        }
      }

      const otpArray = value.split('')

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' '
        otpArray[i] = lastValue
      }

      onChange(otpArray.join(''))
    }
  }

  const handleFail = () => {
    setShake(true)
    setTimeout(() => setShake(false), 300)
    selectInput(0)
  }

  return (
    <Stack flexDirection={'row'} gap={16}>
      {new Array(length).fill(null).map((_, index) => (
        <Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement
            }}
            autoFocus={index === 0}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: ele => {
                  inputRefs.current[index] = ele!
                },
                onKeyDown: event => handleKeyDown(event, index),
                onChange: event => handleChange(event, index),
                onClick: event => handleClick(event, index),
                onPaste: event => handlePaste(event, index),
                value: value[index] ?? '',
                className: shake ? 'shake' : ''
              }
            }}
          />
          {index === length - 1 ? null : separator}
        </Fragment>
      ))}
    </Stack>
  )
}

export default forwardRef(OTP)

interface UseOptVerifyOptions {
  onVerifable?: () => void
  onFail?: () => void
}

export interface OptHandle {
  handleFail: () => void
}

enum OptInputStatus {
  CODING,
  SUCCESS,
  FAIL,
  WAITING
}

export function useOptVerify({ onVerifable, onFail }: UseOptVerifyOptions) {
  const optRef = useRef<OptHandle>(null)
  const [status, setStatus] = useState(OptInputStatus.CODING)
  const [otp, setOtp] = useState('')

  const VerifySuccessHandle = useCallback(() => {
    setStatus(OptInputStatus.SUCCESS)
  }, [])

  const VerifyFailHandle = useCallback(() => {
    setStatus(OptInputStatus.FAIL)
  }, [])

  const VerifyWaitingHandle = useCallback(() => {
    setStatus(OptInputStatus.WAITING)
  }, [])

  useEffect(() => {
    if (status === OptInputStatus.CODING) return
    if (status === OptInputStatus.SUCCESS) {
      onVerifable && onVerifable()
      return
    }
    if (status === OptInputStatus.FAIL) {
      setOtp('')
      optRef.current?.handleFail()
      onFail && onFail()
      return
    }
  }, [onFail, onVerifable, status])

  useEffect(() => {
    setStatus(OptInputStatus.CODING)
  }, [otp])

  return {
    optValue: otp,
    setOptValue: setOtp,
    optInputStatus: status,
    optRef,
    VerifySuccessHandle,
    VerifyFailHandle,
    VerifyWaitingHandle
  }
}
