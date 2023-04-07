import { Box, Button, Typography } from '@mui/material';
import { UserContext, useUserContext } from '@/context/UserContext';
import Navbar from '@/shared/Navbar';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { SignInHeader, Header, Footer, SignInFooter } from '@/login';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import theme from '@/theme';
import { getUpdatedAmplifyConfig } from '@/utils';
import { ListUsersQuery } from '@/API';
import useTitle from '@/hooks/useTitle';
import io from 'socket.io-client';
import axios from 'axios';
import { palette } from '@/theme/theme';
import { useRouter } from 'next/router';

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

//TODO: user needs to be retrieved from graphql by username
const NoAuthLanding = ({ className }: any): JSX.Element => {
  const router = useRouter();
  useTitle('My Application Secretary');

  const handleLogin = async () => {
    router.push('/auth/landing');
  };

  const handleGetStarted = async () => {
    //
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
            <Button variant='landing' onClick={handleGetStarted}>
              GET STARTED NOW
            </Button>
          </Box>
        </Box>
        <Typography
          variant='h1'
          align='center'
          sx={{
            color: palette.secondary.main,
            cursor: 'pointer',
            marginTop: '2rem'
          }}
          onClick={handleLogin}
        >
          LOGIN
        </Typography>
      </Box>
    </>
  );
};

const LandingPage = () => {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <NoAuthLanding />
        </StyledThemeProvider>
      </ThemeProvider>
    </main>
  );
};

export default LandingPage;
