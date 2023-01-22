import { withAuthenticator } from '@aws-amplify/ui-react';

import { SignInHeader, Header, Footer, SignInFooter } from './login';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getUpdatedAmplifyConfig } from './utils';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import Routes from './routes';
import { Auth } from 'aws-amplify';

const isProd = getUpdatedAmplifyConfig();

const App = ({ signOut, user, children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes signOut={signOut} authUser={user}>
            {children}
          </Routes>
        </BrowserRouter>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default withAuthenticator(App, {
  components: {
    //Header: Header, this should be custoom logo
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  },
  socialProviders: ['google'] //TODO: add facebook, apple, amazon, etc logins.
});
