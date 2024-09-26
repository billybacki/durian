import { Button, ButtonProps } from '@mui/material'

export default function BitterButton({ ...props }: ButtonProps) {
  return (
    <Button
      sx={{
        color: props.variant === 'contained' ? 'var(--ps-color-100)' : 'var(--ps-drop)',
        backgroundColor: props.variant === 'contained' ? 'var(--ps-drop)' : 'transparents',
        border: props.variant === 'contained' ? '0' : '1px solid var(--ps-drop)',
        '&:hover': {
          backgroundColor: props.variant === 'contained' ? 'var(--ps-drop)' : 'transparents',
          border: props.variant === 'contained' ? '0' : '1px solid var(--ps-drop)'
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
