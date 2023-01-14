import { Theme } from '@aws-amplify/ui-react';

export enum COLORS {
  PRIMARY = 'hsl(206, 40%, 13%)',
  HOVER = 'hsl(206, 40%, 45%)',
  SECONDARY = 'hsl(182, 43%, 76%)',
  WHITE = '#fff',
  ERROR = '#e63946'
}

export const getColors = (color?: string) => {
  switch (color) {
    case 'primary':
      return COLORS.PRIMARY;
      break;
    case 'hover':
      return COLORS.HOVER;
      break;
    case 'secondary':
      return COLORS.SECONDARY;
      break;
    case 'white':
      return COLORS.SECONDARY;
      break;
    case 'error':
      return COLORS.ERROR;
      break;
    default:
      return COLORS.PRIMARY;
  }
};

const baseTheme: Theme = {
  name: 'button-theme',
  tokens: {
    colors: {
      border: {
        // this will affect the default button's border color
        primary: { value: 'black' }
      }
    },
    components: {
      button: {
        // this will affect the font weight of all button variants
        fontWeight: { value: '{fontWeights.extrabold}' },
        // style the primary variation
        primary: {
          backgroundColor: getColors('primary'),
          //color: getColors('white'),
          _hover: {
            backgroundColor: getColors('secondary')
          },
          _focus: {
            backgroundColor: getColors('secondary')
          },
          _active: {
            backgroundColor: getColors('primary')
          }
        }
      },
      text: {
        primary: {
          color: getColors('primary')
        }
      }
    }
  }
};

const theme = { ...baseTheme };
export default theme;
