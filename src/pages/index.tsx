<<<<<<< HEAD
import { Box, Button, Container, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
=======
import { Box, Button, CssBaseline, Divider, Typography } from '@mui/material';
import Navbar from '@/shared/Navbar';
import { Auth } from 'aws-amplify';
import React from 'react';
import theme from '@/theme';
import { getUpdatedAmplifyConfig } from '@/utils';
>>>>>>> f33040313b887fb4ed9b0b6cef72de7cb780b572
import useTitle from '@/hooks/useTitle';
import { palette } from '@/theme/theme';
import { useRouter } from 'next/router';
import Grow from '@mui/material/Grow';
import Footer from '@/shared/Footer';
import { APP_NAME } from '@/appConstants';
<<<<<<< HEAD
import Wrapper from '@/shared/Wrapper';
import { useUserContext } from '@/context/UserContext';
import { Cache } from 'aws-amplify';

const LandingPage = (): JSX.Element => {
=======

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
const Landing = ({ className }: any): JSX.Element => {
>>>>>>> f33040313b887fb4ed9b0b6cef72de7cb780b572
  const router = useRouter();
  useTitle(APP_NAME);

  const handleLogin = async () => {
    router.push('/api/auth/login');
  };

  const handleGetStarted = async () => {
    //
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        borderRadius: '1rem',
        color: 'secondary.dark'
      }}
    >
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: 1000 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h1'>Automate Your Job Search</Typography>
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
            justifyContent: 'start',
            marginTop: '5rem',
            maxWidth: '60%',
            alignSelf: 'center'
          }}
        >
          <Typography variant='h6'>
            It&apos;s time the rest of us benefitted from automation.
          </Typography>
        </Box>
      </Grow>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: 2000 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5rem'
          }}
        >
<<<<<<< HEAD
          <Button size='large' variant='nav' onClick={handleGetStarted}>
            GET STARTED
          </Button>
        </Box>
      </Grow>
    </Container>
  );
};

const Landing = (): JSX.Element => {
  const { user } = useUserContext();
  const router = useRouter();

  //TODO: this function should verify a user has paid before redirecting to dashboard
  // if user hasn't paid, redirect to checkout if possible or a "you haven't paid yet" page
  const route = useCallback(async () => {
    const redirect = Cache.getItem('path');

    if (user && redirect) {
      Cache.removeItem('path');
      await router.push(redirect);
    } else if (user && !redirect) {
      await router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    route().catch(error => {
      // Handle any error that occurred during the initial route
      console.error('Error occurred during initial route:', error);
    });
  }, [route]);

  return (
    <Wrapper>
      <LandingPage />
    </Wrapper>
=======
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '5rem'
            }}
          >
            <Button size='large' variant='nav' onClick={handleLogin}>
              GET STARTED
            </Button>
          </Box>
        </Grow>
      </Box>
    </Box>
  );
};

const LandingPage = () => {
  return (
    <main>
      <CssBaseline />
      <Navbar />
      <Landing />
      <Footer />
    </main>
>>>>>>> f33040313b887fb4ed9b0b6cef72de7cb780b572
  );
};

export default Landing;
