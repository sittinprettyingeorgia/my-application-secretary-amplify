import { Box, Button, CssBaseline, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useTitle from '@/hooks/useTitle';
import { useRouter } from 'next/router';
import Grow from '@mui/material/Grow';
import { APP_NAME } from '@/appConstants';
import Wrapper from '@/shared/Wrapper';
import { useUserContext } from '@/context/UserContext';

const Landing = (): JSX.Element => {
  const router = useRouter();
  useTitle(APP_NAME);

  const handleGetStarted = async () => {
    router.push('/pricing');
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
            <Button size='large' variant='nav' onClick={handleGetStarted}>
              GET STARTED
            </Button>
          </Box>
        </Grow>
      </Box>
    </Box>
  );
};

const LandingPage = (): JSX.Element => {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Wrapper>
        <CssBaseline />
        <Landing />
      </Wrapper>
    </main>
  );
};

export default LandingPage;
