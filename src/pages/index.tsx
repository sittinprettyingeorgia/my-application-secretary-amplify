import { Box, Button, CssBaseline, Divider, Typography } from '@mui/material';
import Navbar from '@/shared/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Auth } from 'aws-amplify';
import React from 'react';
import theme from '@/theme';
import { getUpdatedAmplifyConfig } from '@/utils';
import useTitle from '@/hooks/useTitle';
import { palette } from '@/theme/theme';
import { useRouter } from 'next/router';
import Grow from '@mui/material/Grow';
import Footer from '@/shared/Footer';

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
          minHeight: '500px',
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
          <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: 1000 }}
          >
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
              <Button variant='outlined' onClick={handleLogin}>
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
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Divider
        variant='fullWidth'
        sx={{
          height: '10px', // set the height of the divider
          width: '100%',
          backgroundColor: palette.secondary.dark // set the background color of the divider
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '50%',
          display: 'flex',
          backgroundColor: palette.primary.main
        }}
      >
        <Box
          sx={{
            width: '50%',
            paddingLeft: '5rem',
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <Typography variant='h2'>
            My Application Secretary can apply to hundreds of jobs on your
            behalf every day.
          </Typography>
        </Box>
        <Box
          sx={{
            width: '45%',
            justifySelf: 'end',
            marginTop: '20rem',
            marginBottom: '5rem',
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <Typography variant='h5'>
            By utilizing Natural Language Processing, My Application Secretary
            finds and applies to jobs based on your preferences.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          justifySelf: 'center',
          padding: '2rem',
          display: { xs: 'flex', md: 'none' },
          marginTop: 'auto'
        }}
      >
        <Typography variant='h5'>
          My Application Secretary can apply to hundreds of jobs on your behalf
          every day.
        </Typography>
      </Box>
      <Footer />
    </Box>
  );
};

const LandingPage = () => {
  return (
    <main
      style={{
        height: '100vh'
      }}
    >
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <NoAuthLanding />
          <CallToAction1 />
        </StyledThemeProvider>
      </ThemeProvider>
    </main>
  );
};

export default LandingPage;
