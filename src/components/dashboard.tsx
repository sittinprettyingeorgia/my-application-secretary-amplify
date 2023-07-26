import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import useTitle from '@/hooks/useTitle';
import { useRouter } from 'next/router';
import Grow from '@mui/material/Grow';
import Wrapper from '@/shared/Wrapper';
import Spinner from '@/shared/Spinner';
import useCurrentUser from '@/hooks/useCurrentUser';

const DashboardPage = (): JSX.Element => {
  const { user, isLoading, isError } = useCurrentUser();
  const router = useRouter();
  useTitle('Dashboard');

  const handleGetStarted = async () => {
    router.push('/pricing');
  };

  if (isLoading) {
    return <Spinner />;
  }

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

const Dashboard = (): JSX.Element => {
  return (
    <Wrapper>
      <DashboardPage />
    </Wrapper>
  );
};

export default Dashboard;
