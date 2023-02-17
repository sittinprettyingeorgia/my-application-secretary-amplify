import { Box, Button, Typography } from '@mui/material';
import { ROUTES } from '@/appConstants';
import { useUserContext } from '@/context/UserContext';
import Navbar from '@/shared/Navbar';
import StyledLink from '@/shared/StyledLink';
import Head from 'next/head';
import Image from 'next/image';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { SignInHeader, Header, Footer, SignInFooter } from '@/login';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { API, Auth, withSSRContext } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import theme from '@/theme';
import { getUpdatedAmplifyConfig } from '@/utils';
import { UserContext } from '@/context/UserContext';
import { ListUsersQuery } from '@/API';

const isProd = getUpdatedAmplifyConfig();

// export async function getServerSideProps({ req }) {
//   const SSR = withSSRContext({ req });

//   try {
//     const response = await SSR.API.graphql({
//       query: listPosts,
//       authMode: 'API_KEY'
//     });
//     return {
//       props: {
//         posts: response.data.listPosts.items
//       }
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       props: {}
//     };
//   }
// }

async function signUp() {
  try {
    const { user } = await Auth.signUp({
      username: 'admin@myapplicationsecretary.com',
      password: 'Password1007$',
      attributes: {},
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true
      }
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }
}

// // //TODO: user needs to be retrieved from graphql by username
const Landing = ({ className }: any): JSX.Element => {
  const { user } = useUserContext();

  return (
    <>
      <Head>
        <title>My Application Secretary</title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          padding: '2rem',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            marginTop: '1rem',
            backgroundColor: 'secondary.light',
            borderRadius: '1rem',
            padding: '1rem',
            color: 'primary.dark'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              marginTop: '5rem'
            }}
          >
            <Typography variant='landing'>Automate Your Job Search</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              marginTop: '5rem',
              maxWidth: '60%',
              alignSelf: 'center'
            }}
          >
            <Typography variant='h6'>
              My Application Secretary can apply to hundreds or thousands of
              jobs on your behalf every day!
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '10rem'
            }}
          >
            <Button variant='landing'>
              <StyledLink path={ROUTES.ONBOARDING} message='Get Started Now' />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

interface Props extends AppProps {
  signOut: any;
  user: any;
}

const App = ({ signOut, user, pageProps }: Props) => {
  const [appUser, setAppUser] = useState<any>();

  const retrieveCurrentAppUser = async (currentAuthUser: any) => {
    const query = `
      query MyQuery {
        getUser(identifier: "${currentAuthUser.username}") {
          id
          isActive
          jobPostingInProgress
          jobLinks
          jobLinkCollectionInProgress
          identifier
          firstName
          email
          createdAt
          currentAppInfo
          lastName
          subscriptionTier
          subscriptionType
          updatedAt
          userJobPreferencesId
          Answers {
            items {
              answer
              questionID
              id
            }
          }
        }
      }
      `;

    console.log(currentAuthUser);
    let currentUser;
    try {
      currentUser = (await API.graphql({
        query,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })) as Promise<ListUsersQuery>;

      console.log(currentUser);
      setAppUser(currentUser);
    } catch (e: any) {
      console.log(e);
      if (
        e.errors.find((t: any) => t.errorType === 'Unauthorized') &&
        currentAuthUser.username
      ) {
        // user is not authorized, prompt signup
      }
      //TODO: we should add error logging
    }
  };

  useEffect(() => {
    retrieveCurrentAppUser(user);
  }, [user]);

  return (
    <main {...pageProps}>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <UserContext.Provider value={{ user: appUser, signOut }}>
            <Landing />
          </UserContext.Provider>
        </StyledThemeProvider>
      </ThemeProvider>
    </main>
  );
};

export default withAuthenticator(App, {
  components: {
    //Header: Header, this should be custoom logo
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  },
  socialProviders: ['google'] //TODO: add facebook, apple, amazon, etc logins.
});
