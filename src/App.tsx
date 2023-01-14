import { withAuthenticator, ThemeProvider } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import { Footer } from './Footer';
import { Header } from './Header';
import { SignInHeader } from './SignHeader';
import { SignInFooter } from './SignInFooter';
import { getUpdatedAmplifyConfig } from './util';
import './styles.css';

import Home from './Home';
import theme from './theme';

const isProd = getUpdatedAmplifyConfig(awsconfig);

const App = ({ signOut, user }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Home signOut={signOut} authUser={user} />
    </ThemeProvider>
  );
};

export default withAuthenticator(App, {
  components: {
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  },
  socialProviders: ['google'] //TODO: add facebook, apple, amazon, etc logins.
});
