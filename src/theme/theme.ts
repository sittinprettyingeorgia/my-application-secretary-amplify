import { Components, createTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    nav: true;
    landing: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    landing: true;
  }
}

const shimmerAnimation = css`
  @keyframes shimmer {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(200%);
    }
  }
`;

export const palette = {
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
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        color: palette.secondary.dark,
        borderRadius: '0px',
        '&:hover': {
          color: palette.secondary.main,
          backgroundColor: 'transparent',
          border: `3px solid ${palette.secondary.dark}`
        }
      }
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
  MuiCheckbox: {
    defaultProps: {
      size: 'small'
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
    }
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
      root: {}
    },
    variants: [
      {
        props: { variant: 'landing' },
        style: {
          ...typography.h1,
          fontFamily: 'Josefin Slab',
          fontSize: 64,
          display: 'flex',
          alignItems: 'center'
        }
      }
    ]
  }
};

const theme = createTheme({ typography, palette, components });
export default theme;
