import type { AppProps } from 'next/app';
import '@aws-amplify/ui-react/styles.css';
import '@/styles.css';
import Head from 'next/head';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Script from 'next/script';
import { UserContext } from '@/context/UserContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Auth, Cache } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util';
import { Authenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
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
      const comingFromCheckout = user?.username && from === '/checkout';

      Cache.removeItem('from');
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);

      if (comingFromCheckout) {
        await router.push(from);
      }
    } catch (e) {
      log.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setUser, router, user?.username]);

  useEffect(() => {
    // Listen for changes to the Auth state and set the local state
    handleNewUser().catch(e => {
      log.error(e);
    });
  }, [handleNewUser]);

  const signOut = useCallback(async () => {
    try {
      setSocket(null);
      await Auth.signOut();
    } catch (e) {
      log.error('error signing out: ', e);
    }
  }, [setSocket]);

  const profile = useMemo(
    () => ({
      user,
      setUser,
      signOut,
      socket,
      setSocket
    }),
    [user, setUser, signOut, socket, setSocket]
  );

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
