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
        backgroundColor: 'white',
        padding: '2rem',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          marginTop: '5rem'
        }}
      >
        <Typography sx={{ alignSelf: 'start' }} variant='landing'>
          Relax
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '5rem'
        }}
      >
        <Typography sx={{ alignSelf: 'start' }} variant='h1'>
          Automate The Job Application Process!
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: '5rem'
        }}
      >
        <Typography sx={{ alignSelf: 'start' }} variant='h1'>
          Take Back Your Time!
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
