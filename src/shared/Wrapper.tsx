import { authUser, noAuthUser, ROUTES } from '@/appConstants';
import { useUserContext } from '@/context/UserContext';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { Children, cloneElement } from 'react';
import Footer from './Footer';
import Navbar, { Page } from './Navbar';

type Props = {
  children?: React.ReactNode;
  sx?: any;
};

const Wrapper = ({ children, sx }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default Wrapper;
