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
import { Auth, Hub } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util';
import { Authenticator } from '@aws-amplify/ui-react';

log.setLevel('error');
getUpdatedAmplifyConfig();

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Check the current user when the app loads
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(e => console.log(e));

    // Listen for changes to the Auth state and set the local state
    const hubListenerCancelToken = Hub.listen('auth', data => {
      const { payload } = data;
      console.log('A new auth event has happened: ', data.payload.event);
      onAuthEvent(payload);
    });

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
      default:
        return;
    }
  };

  const signOut = async () => {
    try {
      setSocket(null);
      await Auth.signOut();
      console.log('signed out');
    } catch (e) {
      console.log(e);
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

  return (
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
  );
}

export default App;
