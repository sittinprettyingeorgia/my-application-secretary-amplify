import type { AppProps } from 'next/app';
import '@aws-amplify/ui-react/styles.css';
import '@/styles.css';
import Head from 'next/head';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Script from 'next/script';
import { UserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { Auth, Cache, Hub } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util';
import { Authenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

log.setLevel('error');
getUpdatedAmplifyConfig();

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const from = Cache.getItem('from');

    if (from) {
      Cache.setItem('from', null);
      router.replace(from);
    }

    // Check the current user when the app loads
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        setUser(user);
      })
      .catch(e => {
        log.error('Auth.currentAuthenticatedUser error: ', e);
      });

    // Listen for changes to the Auth state and set the local state
    const hubListenerCancelToken = Hub.listen('auth', data => {
      const { payload } = data;
      onAuthEvent(payload);
    });

    setIsLoading(false);

    return () => {
      hubListenerCancelToken();
    };
  }, []);

  const onAuthEvent = (payload: any) => {
    switch (payload.event) {
      case 'signIn':
        return setUser(payload.data);
      case 'signOut':
        return setUser(null);
      case 'signUp':
        return;
      default:
        return;
    }
  };

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

  if (isLoading) return <div>Loading...</div>;

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
