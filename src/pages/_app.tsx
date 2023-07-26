import type { AppProps } from 'next/app';
import '@aws-amplify/ui-react/styles.css';
import '@/styles.css';
import Head from 'next/head';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import Script from 'next/script';
import { UserContext } from '@/context/UserAuthContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Auth, Cache } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util/auth';
import { useRouter } from 'next/router';
import Spinner from '@/shared/Spinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Authenticator } from '@aws-amplify/ui-react';

log.setLevel('error');
getUpdatedAmplifyConfig();

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const [authUser, setAuthUser] = useState<any>();
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoadingAuthUser, setIsLoadingAuthUser] = useState(true);

  const handleNewUser = useCallback(async () => {
    try {
      setIsLoadingAuthUser(true);
      const from = Cache.getItem('from');
      const comingFromCheckout = authUser?.username && from === '/checkout';
      Cache.removeItem('from');
      const currentAuthUser = await Auth.currentAuthenticatedUser();
      setAuthUser(currentAuthUser);

      if (comingFromCheckout) {
        await router.push(from);
      }
    } catch (e) {
      log.error(e);
    } finally {
      setIsLoadingAuthUser(false);
    }
  }, [setIsLoadingAuthUser, authUser, router]);

  useEffect(() => {
    // Listen for changes to the Auth state and set the local state
    (async () => {
      try {
        await handleNewUser();
      } catch (e) {
        log.error(e);
      }
    })();
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
      authUser,
      setAuthUser,
      signOut,
      socket,
      setSocket,
      isLoadingAuthUser
    }),
    [authUser, signOut, socket, isLoadingAuthUser]
  );

  if (isLoadingAuthUser) {
    //TODO: custom loading icon
    return <Spinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        <UserContext.Provider value={profile}>
          <ThemeProvider theme={theme}>
            <Head>
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1'
              />
              <meta name='theme-color' content='#000000' />
            </Head>
            <Script src='https://js.stripe.com/v3/' />
            <Component {...pageProps} />
          </ThemeProvider>
        </UserContext.Provider>
      </Authenticator.Provider>
    </QueryClientProvider>
  );
}

export default App;
