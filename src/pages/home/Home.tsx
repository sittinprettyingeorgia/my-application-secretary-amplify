import { HomeOutlined } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useUserContext } from 'context/UserContext';
import useTitle from 'hooks/useTitle';
import Navbar from 'shared/Navbar';

//TODO: user needs to be retrieved from graphql by username
const Home = ({ children, className }: any): JSX.Element => {
  const { user } = useUserContext();
  useTitle('Home');

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
          backgroundColor: 'primary.light',
          borderRadius: '1rem',
          padding: '1rem',
          color: 'white'
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
            <Typography variant='h3'>Get Started Now</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
