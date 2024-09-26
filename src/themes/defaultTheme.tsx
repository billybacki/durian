import { PaletteMode, ThemeOptions } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import { defaultThemeColorOptions, defaultThemeDarkColors, defaultThemeLightColors } from './color'
import { getDefaultComponents } from './components'

export const fontFamily = 'Roboto'

export const FontSize = {
  f64: '4rem',
  f56: '3.5rem',
  f40: '2.5rem',
  f28: '1.75rem',
  f24: '1.5rem',
  f22: '1.375rem',
  f20: '1.25rem',
  f18: '1.125rem',
  f16: '1rem',
  f15: '0.9375rem',
  f14: '0.875rem',
  f13: '0.8125rem',
  f12: '0.75rem'
}

const TypographyComponent = {
  fontFamily,
  caption: { fontSize: '6rem', lineHeight: 1.2, fontWeight: 600 },
  h1: { fontSize: '3.75rem', lineHeight: 1, fontWeight: 600 },
  h2: { fontSize: '1.75rem', lineHeight: 1.4 },
  h3: { fontSize: '1.5rem', lineHeight: 1.2 },
  h4: { fontSize: '1.375rem', lineHeight: 1.4 },
  h5: { fontSize: '1.125rem', lineHeight: 1 },
  h6: { fontSize: '1rem', lineHeight: 1 },
  subtitle1: { fontSize: '1.125rem', lineHeight: 1.4 },
  subtitle2: { fontSize: '0.875rem', lineHeight: 1.2 },
  body1: { fontSize: '0.875rem', lineHeight: 1.6 },
  body2: { fontSize: '0.75rem', lineHeight: 1.4 }
} as TypographyOptions

export const getDefaultThemeColors = (mode: PaletteMode) =>
  mode === 'light' ? defaultThemeLightColors : defaultThemeDarkColors

export const getDesignSystemTheme = (mode: PaletteMode): ThemeOptions => ({
  components: getDefaultComponents(defaultThemeColorOptions[mode]['color-600'], fontFamily, mode),
  typography: TypographyComponent,
  spacing: 1,
  shape: {
    borderRadius: 1
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 860,
      lg: 1200,
      xl: 1440
    }
  },
  palette: {
    mode,
    common: { ...defaultThemeColorOptions[mode] },
    ...getDefaultThemeColors(mode)
  }
  // gradient: {
  //   gradient1: '#ffffff linear-gradient(154.62deg, #77C803 9.44%, #28A03E 59.25%);'
  // },
})
