import { Box, Button, Container, Typography } from '@mui/material';
import Navbar from '@/shared/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Auth } from 'aws-amplify';
import React, { useEffect, useState, useRef } from 'react';
import theme from '@/theme';
import { getUpdatedAmplifyConfig } from '@/utils';
import useTitle from '@/hooks/useTitle';
import { palette } from '@/theme/theme';
import { useRouter } from 'next/router';
import Grow from '@mui/material/Grow';
import anime from 'animejs';

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
  const buttonRef = useRef(null);
  useTitle('My Application Secretary');

  const handleLogin = async () => {
    router.push('/api/auth/login');
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
          minHeight: '50vh',
          width: '100%'
        }}
      >
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '1rem',
            borderRadius: '1rem',
            padding: '1rem',
            color: 'secondary.dark'
          }}
        >
          <Grow in={true}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '5rem'
              }}
            >
              <Typography variant='h1'>Automate Your Job Search</Typography>
            </Box>
          </Grow>
          <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: 1000 }}
          >
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
                My Application Secretary can apply to hundreds of jobs on your
                behalf every day.
              </Typography>
            </Box>
          </Grow>
          <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: 1500 }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '5rem'
              }}
            >
              <Button ref={buttonRef} variant='outlined' onClick={handleLogin}>
                GET STARTED
              </Button>
            </Box>
          </Grow>
        </Box>
      </Box>
    </>
  );
};

const CallToAction1 = () => {
  return (
    <>
      <Container
        sx={{
          display: 'grid',
          backgroundColor: palette.secondary.dark,
          width: '100%',
          height: '50vh'
        }}
        disableGutters
        maxWidth='xl'
      ></Container>
    </>
  );
};

const LandingPage = () => {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <NoAuthLanding />
          <CallToAction1 />
        </StyledThemeProvider>
      </ThemeProvider>
    </main>
  );
};

export default LandingPage;
