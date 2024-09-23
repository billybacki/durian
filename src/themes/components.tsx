import { Box, CommonColors, Components, PaletteMode, Theme, styled } from '@mui/material'

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
            fontSize: 14,
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
          height: 44,
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
          height: 44,
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
            fontSize: 16,
            textTransform: 'none',
            fontFamily,
            lineHeight: 1.4,
            padding: '12px 24px',
            fontWeight: 600,
            transition:
              'background-color 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            [theme.breakpoints.down('md')]: {
              fontSize: 14
            }
          }),
        sizeLarge: ({ theme }) =>
          theme.unstable_sx({
            height: {
              xs: 38,
              md: 44
            },
            borderRadius: {
              xs: '100px',
              md: '100px'
            }
          }),
        sizeMedium: ({ theme }) =>
          theme.unstable_sx({
            height: {
              xs: 34,
              md: 44
            },
            borderRadius: '100px'
          }),
        sizeSmall: {
          height: 29,
          fontSize: 12,
          padding: '6px 16px',
          borderRadius: '100px',
          minWidth: 'fit-content'
        }
      },
      variants: [
        {
          props: { variant: 'black' },
          style: {
            backgroundColor: '#121212',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#12121299'
            }
          }
        },
        {
          props: { variant: 'text' },
          style: {
            color: 'var(--ps-text-primary4)',
            '&:hover': {
              color: 'var(--ps-text-100)',
              backgroundColor: 'transparent'
            },
            '&:disabled': {
              color: 'var(--ps-text-20)'
            }
          }
        },
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: 'var(--ps-text-primary4)',
            color: 'var(--ps-neutral)',
            '&:hover': {
              backgroundColor: 'var(--ps-text-primary4)',
              boxShadow: '0px 3px 0px 0px #695C47'
            },
            '&:disabled': {
              backgroundColor: 'var(--ps-neutral3)',
              color: 'var(--ps-text-primary2)'
            }
          }
        },
        {
          props: { variant: 'input' },
          style: {
            fontSize: 12,
            height: 25,
            padding: '4px 12px',
            borderRadius: 4,
            background: 'var(--ps-text-primary4)',
            color: 'var(--ps-text-primary)',
            boxShadow: '2px 4px 8px 0px rgba(0, 0, 0, 0.08)',
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'var(--ps-text-primary4)',
              boxShadow: '0px 3px 0px 0px #695C47'
            },
            '&:disabled': {
              backgroundColor: 'var(--ps-neutral3)',
              color: 'var(--ps-text-primary2)'
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            background: 'var(--ps-neutral)',
            color: 'var(--ps-text-primary4)',
            border: '1px solid var(--ps-text-primary4)',
            '&:hover': {
              background: 'var(--ps-neutral)',
              boxShadow: '0px 3px 0px 0px #695C47'
            },
            '&:disabled': {
              backgroundColor: 'transparent',
              color: 'var(--ps-text-20)',
              border: '1px solid var(--ps-text-20)'
            }
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
                fontSize: 12,
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
            height: 32,
            borderRadius: 6,
            width: 32,
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

export const TabMediumBox = styled(Box)(
  ({ active, width, fontSize }: { active: boolean; width?: number | string; fontSize?: number | string }) => ({
    display: 'flex',
    width: width || 100,
    padding: '8px 16px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 100,
    fontSize: fontSize || 16,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 1.4,
    cursor: 'pointer',
    background: active ? 'var(--ps-text-primary4)' : 'transparent',
    color: active ? 'var(--ps-neutral)' : 'var(--ps-text-40)',
    '&:hover': {
      color: !active ? 'var(--ps-text-primary4)' : 'var(--ps-neutral)'
    }
  })
)
