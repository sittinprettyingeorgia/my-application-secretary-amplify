import { Box, Button, CssBaseline, Divider, Typography } from '@mui/material';
import Navbar from '@/shared/Navbar';
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
const Landing = ({ className }: any): JSX.Element => {
  const router = useRouter();
  useTitle('My Application Secretary');

  const handleLogin = async () => {
    router.push('/api/auth/login');
  };

  const handleGetStarted = async () => {
    //
  };

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        padding: '2rem',
        minHeight: '500px',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '10%',
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
            <Button size='large' variant='outlined' onClick={handleLogin}>
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
  );
};

export default LandingPage;
