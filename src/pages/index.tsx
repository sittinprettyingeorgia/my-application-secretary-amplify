import { Box, Button, Container, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import useTitle from '@/hooks/useTitle';
import { useRouter } from 'next/router';
import Grow from '@mui/material/Grow';
import { APP_NAME } from '@/appConstants';
import Wrapper from '@/shared/Wrapper';
import { useUserContext } from '@/context/UserContext';

const LandingPage = (): JSX.Element => {
  const router = useRouter();
  useTitle(APP_NAME);

  const handleGetStarted = async () => {
    router.push('/pricing');
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

  const route = useCallback(async () => {
    if (user) {
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
  );
};

export default Landing;
