import type { AppProps } from 'next/app';
import '@aws-amplify/ui-react/styles.css';
import '@/styles.css';
import Head from 'next/head';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import Script from 'next/script';
import { UserContext } from '@/context/UserAuthContext';
import { useCallback, useEffect, useState } from 'react';
import { Auth, Cache } from 'aws-amplify';
import log from 'loglevel';
import { getUpdatedAmplifyConfig } from '@/util/auth';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Authenticator } from '@aws-amplify/ui-react';

log.setLevel('error');
getUpdatedAmplifyConfig();

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const [authUser, setAuthUser] = useState<any>();
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Listen for changes to the Auth state and set the local state
    void (async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();

        if (currentUser) {
          const comingFromCheckout = Cache.getItem('path');
          const cognitoUserSession = await Auth.currentSession();
          const Authorization = cognitoUserSession.getIdToken().getJwtToken();
          const access_token = cognitoUserSession
            .getAccessToken()
            .getJwtToken();
          const existingUser = authUser?.username && !comingFromCheckout;
          const dashboard = '/dashboard';

          setAuthUser({
            username: currentUser?.username,
            Authorization,
            access_token
          });

          if (existingUser && router.pathname !== dashboard) {
            //TODO: if authUser?.username exists but no redirect, check if user has paid
            // if user has paid, create a new user and redirect to dashboard
            // if user hasn't paid, redirect to checkout/pricing and alert with toast message.
            await router.push(dashboard);
          } else if (comingFromCheckout) {
            await router.push(comingFromCheckout);
          }
        }
      } catch (e) {
        log.error(e);
      } finally {
        Cache.removeItem('from');
        Cache.removeItem('path');
      }
    })();
  }, [router, authUser?.username]);

  const signOut = useCallback(async () => {
    try {
      setSocket(null);
      await Auth.signOut();
    } catch (e) {
      log.error('error signing out: ', e);
    }
  }, [setSocket]);

  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        <UserContext.Provider
          value={{
            authUser,
            setAuthUser,
            signOut,
            socket,
            setSocket
          }}
        >
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

export async function getServerSideProps(context: any) {
  const { from = '/' } = context.query; // Read query parameters from the URL
  // Use queryParams as props for the redirected page
  // ...

  return {
    props: {
      // Your props
      from
    }
  };
}
