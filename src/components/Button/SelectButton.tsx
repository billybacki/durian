import { Button, ButtonProps } from '@mui/material'

interface CustomButtonProps extends ButtonProps {
  empty: boolean
}

export default function SelectButton({ empty, ...props }: CustomButtonProps) {
  return (
    <Button
      variant={'input'}
      sx={{
        color: empty ? 'var(--ps-color-500)' : 'var(--ps-color-600)',
        '&:hover': {
          border: '1px solid var(--ps-color-600)'
        },
        '&:disabled': {
          color: empty ? 'var(--ps-color-300)' : 'var(--ps-color-500)',
          border: '1px solid var(--ps-color-300)'
        }
      }}
      {...props}
    >
      {props.children}
    </Button>
  )
}
