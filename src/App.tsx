import { withAuthenticator, ThemeProvider } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import { SignInHeader, Header, Footer, SignInFooter } from './login';
import { getUpdatedAmplifyConfig } from './util';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import Routes from './routes';

const isProd = getUpdatedAmplifyConfig(awsconfig);

const App = ({ signOut, user, children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes signOut={signOut} authUser={user}>
          {children}
        </Routes>
      </BrowserRouter>
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
