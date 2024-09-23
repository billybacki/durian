import { PaletteMode, ThemeOptions } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import { defaultThemeColorOptions, defaultThemeDarkColors, defaultThemeLightColors } from './color'
import { getDefaultComponents } from './components'

export const fontFamily = 'Roboto'

const TypographyComponent = {
  fontFamily,
  h1: { fontSize: '4rem', lineHeight: 1 },
  h2: { fontSize: '3.5rem', lineHeight: 1.4 },
  h3: { fontSize: '2.5rem', lineHeight: 1.4 },
  h4: { fontSize: '1.4rem', lineHeight: 1.4 },
  h5: { fontSize: '1.25rem', lineHeight: 1.3 },
  h6: { fontSize: '1rem', lineHeight: 1.4 },
  caption: { fontSize: '0.875rem', lineHeight: 1.4 },
  subtitle1: { fontSize: '0.875rem', lineHeight: 1.4 },
  body1: { fontSize: '1rem', lineHeight: 1.4 },
  body2: { fontSize: '0.875rem', lineHeight: 1.3 }
} as TypographyOptions

export const getDefaultThemeColors = (mode: PaletteMode) =>
  mode === 'light' ? defaultThemeLightColors : defaultThemeDarkColors

export const getDesignSystemTheme = (mode: PaletteMode): ThemeOptions => ({
  components: getDefaultComponents(defaultThemeColorOptions[mode]['text-100'], fontFamily, mode),
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
