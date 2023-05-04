import type { AppProps } from 'next/app';
import '@aws-amplify/ui-react/styles.css';
import '@/styles.css';
import Head from 'next/head';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Script from 'next/script';
import { UserContext } from '@/context/UserContext';
import { use, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util/utils';
import { isAuthenticated } from '@/util/auth';

log.setLevel('info');

const isProd = getUpdatedAmplifyConfig();

export default function App({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [user, setUser] = useState<any>(null);

  const isAuth = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    isAuth();
  }, []);

  const signOut = async () => {
    try {
      setSocket(null);
      await Auth.signOut();
    } catch (error) {
      log.error('error signing out: ', error);
    }
  };

  const profile = {
    signOut,
    socket,
    setSocket,
    user
  };

  return (
    <>
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
    </>
  );
}
