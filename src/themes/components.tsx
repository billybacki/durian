import { CommonColors, Components, PaletteMode, Theme } from '@mui/material'
import { FontSize } from '.'

const buildVar = function (name: string) {
  const NAMESPACE = '--ps-'
  return `${NAMESPACE}${name}`
}

export function getDefaultComponents(
  bodyColor: string,
  fontFamily: string,
  mode: PaletteMode
): Components<Omit<Theme, 'components'>> | undefined {
  mode
  return {
    MuiCssBaseline: {
      styleOverrides: (theme: Theme) => {
        const common = theme.palette.common
        const vars = Object.keys(common).reduce((prev: any, next) => {
          prev[buildVar(next)] = common[next as unknown as keyof CommonColors]
          return prev
        }, {})

        return {
          html: {
            ...vars,
            '*: hover': {
              transition: '0.2s'
            }
          },
          body: {
            fontFamily: fontFamily,
            color: bodyColor
          },
          a: {
            textDecoration: 'none',
            color: 'inherit'
          },
          picture: { display: 'inline-flex' },
          input: {
            '&::placeholder': {},
            '&:-webkit-autofill, &:-webkit-autofill:focus': {
              transition: 'background-color 600000s 0s, color 600000s 0s'
            }
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // height: 44,
          'fieldset legend': {
            display: 'none!important'
          },
          '&.Mui-focused': {
            fieldset: {
              borderColor: 'currentColor!important',
              borderWidth: '1px!important'
            }
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // height: 44,
          borderRadius: 8
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {}
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '&:not(.MuiInputAdornment-hiddenLabel)': {
            marginTop: '0 !important'
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& input': {
            paddingTop: '14px !important'
          }
        },
        popper: {
          paddingTop: 8,
          paddingBottom: 8
        },
        paper: {
          borderRadius: 8,
          boxShadow: 'none'
        },
        option: {
          height: 50
        },
        listbox: {
          '&::-webkit-scrollbar': {
            width: 6
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 4
          }
        }
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
        disableGutters: true
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '.MuiFormLabel-root + div': {
            'textarea.MuiOutlinedInput-input': {
              paddingTop: '0px!important'
            },
            '.MuiOutlinedInput-input': {
              paddingTop: '18px!important',
              paddingBottom: '0px!important'
            }
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
          '& .MuiInputBase-root': {
            marginTop: 0
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            fontSize: FontSize.f14,
            textTransform: 'none',
            fontFamily,
            lineHeight: 'normal',
            padding: '12px 24px',
            fontWeight: 600,
            borderRadius: '100px',
            transition:
              'background-color 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            // '&:hover': {
            //   boxShadow: 'none'
            // },
          }),
        sizeSmall: {
          fontSize: FontSize.f12,
          padding: '7.5px 16px',
          minWidth: 'fit-content'
        }
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: 'var(--ps-color-600)',
            color: 'var(--ps-color-100)',
            '&:disabled': {
              color: 'var(--ps-color-100)',
              backgroundColor: 'var(--ps-color-300)'
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            padding: '11px 24px',
            background: 'var(--ps-color-100)',
            color: 'var(--ps-color-600)',
            border: '1px solid var(--ps-color-300)',
            '&:hover': {
              border: '1px solid var(--ps-color-300)',
              background: 'transparent'
            },
            '&:disabled': {
              backgroundColor: 'transparent',
              color: 'var(--ps-color-300)',
              border: '1px solid var(--ps-color-300)'
            }
          }
        },
        {
          props: { variant: 'text' },
          style: {
            color: 'var(--ps-brand)',
            fontSize: FontSize.f12,
            padding: '4px 0',
            borderBottom: '1px solid var(--ps-brand)',
            borderRadius: 0,
            minWidth: 'auto',
            '&:hover': {
              color: 'var(--ps-brand)',
              backgroundColor: 'transparent'
            },
            '&:disabled': {
              color: 'var(--ps-brand)',
              opacity: 0.5
            }
          }
        },
        {
          props: { variant: 'input' },
          style: {
            padding: '11px 16px',
            fontSize: FontSize.f16,
            lineHeight: 1,
            justifyContent: 'space-between',
            backgroundColor: 'transparents',
            border: '1px solid var(--ps-color-300)',
            borderRadius: 4
          }
        }
      ]
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: {
              marginTop: 16,
              borderRadius: 20,
              maxHeight: 350,
              boxShadow: 'none',
              '& .MuiMenu-list .MuiListSubheader-sticky': {
                fontSize: FontSize.f12,
                lineHeight: 20 / 12,
                marginTop: 10,
                marginBottom: 10
              }
            }
          },
          MenuListProps: {
            sx: {
              padding: '6px !important'
            }
          }
        }
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: 0,
          '&:before': {
            border: 0
          },
          '&:after': {
            border: 0
          }
        },
        select: {
          '&:focus': {
            background: 'none'
          }
        },
        icon: {
          right: 14
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPagination-ul': {
            // alignItems: 'baseline'
          },
          '& .MuiPaginationItem-root': {
            borderRadius: 6,
            margin: '0 12px'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily
        }
      }
    }
  }
}
