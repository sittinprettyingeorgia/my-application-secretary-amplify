import type { AppProps } from 'next/app';
import '@aws-amplify/ui-react/styles.css';
import '@/styles.css';
import Head from 'next/head';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Script from 'next/script';
import { UserContext } from '@/context/UserContext';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util';

log.setLevel('error');

const isProd = getUpdatedAmplifyConfig();

function App({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

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
    signOut,
    socket,
    setSocket
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

export default App;
