import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import useTitle from '@/hooks/useTitle';
import { useRouter } from 'next/router';
import Grow from '@mui/material/Grow';
import Wrapper from '@/shared/Wrapper';

const LandingPage = (): JSX.Element => {
  useTitle('Landing');
  const router = useRouter();

  const handleGetStarted = async () => {
    await router.push('/pricing');
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
  return (
    <Wrapper>
      <LandingPage />
    </Wrapper>
  );
};

export default Landing;
