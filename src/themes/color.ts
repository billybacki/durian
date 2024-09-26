import { darken } from '@mui/material'
import { IDefaultColor } from './types'

export const defaultThemeColorOptions: IDefaultColor = {
  light: {
    'color-100': '#FFF',
    'color-200': '#F2F5F8',
    'color-300': '#ECF1F5',
    'color-500': '#828B92',
    'color-600': '#000',
    brand: '#F1D754',
    rise: '#1CE33D',
    drop: '#E66215',
    black: '#000',
    white: '#FFFFFF'
  },
  dark: {
    'color-100': '#000',
    'color-200': '#34383B',
    'color-300': '#3B3D40',
    'color-500': '#7C7E80',
    'color-600': '#FFF',
    brand: '#F1D754',
    rise: '#1CE33D',
    drop: '#E66215',
    black: '#000',
    white: '#FFFFFF'
  }
}

export const defaultThemeLightColors = {
  primary: {
    main: '#000000',
    dark: '#000000',
    contrastText: '#fff'
  },
  secondary: {
    main: '#ECF1F5',
    dark: darken('#717171', 0.3),
    contrastText: '#323232'
  },
  error: {
    main: '#FD3333'
  },
  warning: {
    main: '#F0B90B'
  },
  info: {
    main: '#1F9898'
  },
  success: {
    main: '#31B047'
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF'
  },
  text: {
    primary: '#000000',
    secondary: '#000000',
    disabled: '#ECF1F5'
  },
  action: {
    disabledBackground: '#717171',
    disabled: '#323232'
  }
}

export const defaultThemeDarkColors = {
  primary: {
    main: '#fff',
    dark: '#fff',
    contrastText: '#0D0D0D'
  },
  secondary: {
    main: '#3B3D40',
    dark: darken('#717171', 0.2),
    contrastText: '#323232'
  },
  error: {
    main: '#FD3333'
  },
  warning: {
    main: '#F0B90B'
  },
  info: {
    main: '#1F9898'
  },
  success: {
    main: '#31B047'
  },
  background: {
    default: '#000000',
    paper: '#000000'
  },
  text: {
    primary: '#fff',
    secondary: '#fff',
    disabled: '#3B3D40'
  },
  action: {
    disabledBackground: '#717171',
    disabled: '#323232'
  }
}

export const customThemeColors = {
  palette: {
    primary: {
      light: '#3F8CFF',
      main: '#0049C6',
      dark: '#002685',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#FFEBF6',
      main: '#FFA2C0',
      dark: '#FFB7F5',
      contrastText: '#ffffff'
    },
    error: {
      main: '#E46767'
    },
    warning: {
      main: '#FFCE73'
    },
    info: {
      main: '#F0B90B'
    },
    success: {
      main: '#31B047'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#3f5170',
      secondary: '#808191',
      disabled: '#b4b2b2'
    },
    action: {
      disabledOpacity: 0.8
    },
    grey: {
      A700: '#191919',
      A400: '#252525',
      A200: '#303030',
      A100: '#A1A1A1'
    }
  },
  borderRadius: {
    default: '8px'
  },
  boxShadow: {
    bs1: 'inset 0px -1px 0px #E4E4E4',
    bs2: 'rgb(174 174 174 / 20%) 0px 0px 5px'
  },
  gradient: {
    gradient1: '#ffffff linear-gradient(154.62deg, #77C803 9.44%, #28A03E 59.25%);'
  },
  height: {
    header: '80px',
    mobileHeader: '50px'
  },
  width: {
    sidebar: '250px',
    maxContent: '1110px'
  },
  shape: {
    border: '1px solid',
    borderRadius: 8
  },
  zIndex: {
    modal: 99999
  },
  spacing: (factor: number) => `${1 * factor}px`
  // gray: {
  //   main: '#333333',
  //   dark: '#262626',
  // },
}
