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
import { Auth } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util/utils';
import { Page } from '@/shared/Navbar';
import { authUser, noAuthUser } from '@/appConstants';

log.setLevel('error');

const isProd = getUpdatedAmplifyConfig();

interface Props extends AppProps {
  initUser: any;
}
function App({ initUser, Component, pageProps }: Props) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [user, setUser] = useState<any>(initUser);
  const [pages, setPages] = useState<Page[]>(
    user?.username ? noAuthUser : authUser
  );

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
    user,
    pages,
    setPages
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

App.getInitialProps = async (ctx: any) => {
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (e) {
    //ignore user not auth
  }

  return { initUser: user };
};

export default App;
