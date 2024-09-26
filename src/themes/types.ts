interface IColor {
  'color-100': string
  'color-200': string
  'color-300': string
  'color-500': string
  'color-600': string
  brand: string
  drop: string
  rise: string
  black: string
  white: string
}

export interface IDefaultColor {
  light: IColor
  dark: IColor
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    black: true
    input: true
  }
}
declare module '@mui/material/styles' {
  interface ButtinVariants {
    black: React.CSSProperties
    input: React.CSSProperties
  }
  interface ButtinVariantsOptions {
    black?: React.CSSProperties
    input?: React.CSSProperties
  }
}
