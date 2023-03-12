import { Box, Button, Typography } from '@mui/material';
import { ROUTES } from '@/appConstants';
import { UserContext, useUserContext } from '@/context/UserContext';
import Navbar from '@/shared/Navbar';
import StyledLink from '@/shared/StyledLink';
import Head from 'next/head';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { SignInHeader, Header, Footer, SignInFooter } from '@/login';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { API, Auth, withSSRContext } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import theme from '@/theme';
import { getUpdatedAmplifyConfig } from '@/utils';
import { ListUsersQuery } from '@/API';
import useTitle from '@/hooks/useTitle';

const isProd = getUpdatedAmplifyConfig();

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
  useTitle('My Application Secretary');

  const sendAuthToExt = () => {
    const message = { text: 'OUR USER INFO (NON-SENSITIVE)' };
    chrome.runtime.sendMessage(message, response => {
      console.log('Received response from Chrome extension:', response);
    });
  };

  return (
    <>
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

interface Props {
  signOut: any;
  user: any;
}

//TODO: add serverSideProps currentUser retrieval
const App = ({ signOut, user }: Props) => {
  const [appUser, setAppUser] = useState<any>();

  const retrieveCurrentAppUser = async (currentAuthUser: any) => {
    console.log(currentAuthUser);
    //TODO: use aws-amplify to retrieve Auth class inb rest api
    //console.log(await Auth.currentCredentials());
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

    let currentUser;
    try {
      //TODO: replace with call to our rest api
      currentUser = (await API.graphql({
        query,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })) as Promise<ListUsersQuery>;

      setAppUser(currentUser);
    } catch (e: any) {
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
    <main>
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
