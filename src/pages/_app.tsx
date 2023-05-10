import type { AppProps } from 'next/app';
import '@aws-amplify/ui-react/styles.css';
import '@/styles.css';
import Head from 'next/head';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Script from 'next/script';
import { UserContext } from '@/context/UserContext';
import { useCallback, useEffect, useState } from 'react';
import { Auth, Cache, Hub } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util';
import { Authenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { CircularProgress, Container } from '@mui/material';
import Spinner from '@/shared/Spinner';

log.setLevel('error');
getUpdatedAmplifyConfig();

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleNewUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const from = Cache.getItem('from');

      if (from) {
        Cache.removeItem('from');
        router.push(from);
      }

      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (e) {
      log.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setUser, router]);

  useEffect(() => {
    // Listen for changes to the Auth state and set the local state
    handleNewUser();
  }, []);

  const signOut = async () => {
    try {
      setSocket(null);
      await Auth.signOut();
    } catch (e) {
      log.error('error signing out: ', e);
    }
  };

  const profile = {
    user,
    setUser,
    signOut,
    socket,
    setSocket
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Authenticator.Provider>
      <UserContext.Provider value={profile}>
        <ThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <Head>
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1'
              />
              <meta name='theme-color' content='#000000' />
            </Head>
            <Script src='https://js.stripe.com/v3/' />
            <Component {...pageProps} />
          </StyledThemeProvider>
        </ThemeProvider>
      </UserContext.Provider>
    </Authenticator.Provider>
  );
}

export default App;
