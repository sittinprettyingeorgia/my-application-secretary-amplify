import { HomeOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { ROUTES } from 'appConstants';
import { useUserContext } from 'context/UserContext';
import useTitle from 'hooks/useTitle';
import { Link, Routes } from 'react-router-dom';
import Navbar from 'shared/Navbar';
import StyledLink from 'shared/StyledLink';

//TODO: user needs to be retrieved from graphql by username
const Landing = ({ children, className }: any): JSX.Element => {
  const { user } = useUserContext();

  return (
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
            In just a few short hours My Application Secretary can apply to
            hundreds or thousands of jobs on your behalf every day!
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
  );
};
export default Landing;
