import { Button, ButtonProps } from '@mui/material'

export default function SweetButton({ ...props }: ButtonProps) {
  return (
    <Button
      sx={{
        color: props.variant === 'contained' ? 'var(--ps-color-100)' : 'var(--ps-rise)',
        backgroundColor: props.variant === 'contained' ? 'var(--ps-rise)' : 'transparents',
        border: props.variant === 'contained' ? '0' : '1px solid var(--ps-rise)',
        '&:hover': {
          backgroundColor: props.variant === 'contained' ? 'var(--ps-rise)' : 'transparents',
          border: props.variant === 'contained' ? '0' : '1px solid var(--ps-rise)'
        },
        '&:disabled': {
          color: props.variant === 'contained' ? 'var(--ps-color-100)' : 'var(--ps-color-300)',
          backgroundColor: props.variant === 'contained' ? 'var(--ps-color-300)' : 'transparents',
          border: props.variant === 'contained' ? '0' : '1px solid var(--ps-color-300)'
        }
      }}
      {...props}
    >
      {props.children}
    </Button>
  )
}
