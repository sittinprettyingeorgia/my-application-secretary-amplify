import { Components, createTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    nav: true;
    landing: true;
    login: true;
    pay: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    landing: true;
    secondary: true;
    cc: true;
  }
}

export const palette = {
  background: {
    default: '#fafafc'
  },
  primary: {
    main: '#fafafc',
    light: '#fff',
    dark: '#f0f2f5',
    contrast: '#fff'
  },
  secondary: {
    main: '#0a3045',
    light: 'rgb(51, 101, 128)',
    dark: 'rgb(0, 44, 67)',
    contrast: 'rgba(0, 0, 0, 0.87)'
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)'
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrast: '#fff'
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrast: 'rgba(0, 0, 0, 0.87)'
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrast: '#fff'
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
    contrast: 'rgba(0, 0, 0, 0.87)'
  }
};

export const typography = {
  fontFamily: 'Josefin Slab',
  h1: {
    fontWeight: 500,
    fontSize: 80
  },
  h2: {
    fontWeight: 500,
    fontSize: 64
  },
  h3: {
    fontWeight: 500,
    fontSize: 32
  },
  h4: {
    fontWeight: 500,
    fontSize: 24
  },
  fontSize: 18,
  fontWeightLight: 400,
  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 800,
  button: {
    fontWeight: 600
  }
};

const components: Components<Omit<Theme, 'components'>> = {
  MuiAppBar: {
    defaultProps: {},
    styleOverrides: {
      root: {
        boxShadow: 'none'
      }
    }
  },
  MuiAvatar: {
    defaultProps: {},
    styleOverrides: {
      root: {
        backgroundColor: palette.secondary.main,
        color: palette.primary.main
      }
    }
  },
  MuiButton: {
    defaultProps: {
      size: 'small'
    },
    variants: [
      {
        props: { variant: 'login' },
        style: {
          border: 'none'
        }
      },
      {
        props: { variant: 'pay' },
        style: {
          outline: `3px solid ${palette.secondary.dark}`,
          height: '2.5rem',
          width: '30vw',
          '&:hover': {
            color: palette.primary.main,
            backgroundColor: palette.secondary.dark,
            outline: `3px solid ${palette.secondary.dark}`
          }
        }
      },
      {
        props: { variant: 'nav' },
        style: {
          backgroundColor: 'transparent',
          color: palette.secondary.dark,
          borderRadius: '0px',
          '&:hover': {
            color: palette.secondary.main,
            backgroundColor: 'transparent',
            outline: `3px solid ${palette.secondary.dark}`,
            '&::before': {
              opacity: 0
            }
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: 'calc(50% - 10%);' /* center the border and set its width */,
            width:
              '20%' /* set the width of the border to 10% of the button width */,
            height: '3px' /* set the thickness of the border */,
            backgroundColor: '#ccc'
          }
        }
      }
    ],
    styleOverrides: {
      root: {}
    }
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '.MuiButton': {
          root: {}
        }
      }
    }
  },
  MuiButtonGroup: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        border: `2px solid black`
      }
    }
  },
  MuiCheckbox: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiCssBaseline: {
    styleOverrides: {
      root: {
        margin: '0'
      }
    }
  },
  MuiFormControl: {
    defaultProps: {
      size: 'small',
      margin: 'dense'
    }
  },
  MuiFormHelperText: {
    defaultProps: {
      margin: 'dense'
    }
  },
  MuiFab: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiIconButton: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiInputBase: {
    defaultProps: {
      margin: 'dense'
    }
  },
  MuiInputLabel: {
    defaultProps: {
      margin: 'dense'
    }
  },
  MuiLink: {
    defaultProps: {
      underline: 'none'
    },
    styleOverrides: {
      root: {
        color: palette.secondary.dark
      }
    },
    variants: [
      {
        props: { variant: 'secondary' },
        style: {
          color: palette.primary.main,
          fontWeight: 800
        }
      }
    ]
  },
  MuiList: {
    styleOverrides: {
      root: {}
    }
  },
  MuiMenu: {
    styleOverrides: {
      root: {}
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {}
    }
  },
  MuiRadio: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiSwitch: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiTextField: {
    defaultProps: {
      margin: 'dense',
      size: 'small'
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: 'Josefin Slab'
      }
    },
    variants: [
      {
        props: { variant: 'landing' },
        style: {
          ...typography.h1,
          fontSize: 64,
          display: 'flex',
          alignItems: 'center'
        }
      },
      {
        props: { variant: 'cc' },
        style: {
          ...typography.h1,
          color: `${palette.primary.light}`,
          fontSize: '1rem'
        }
      }
    ]
  }
};

const theme = createTheme({ typography, palette, components });
export default theme;
