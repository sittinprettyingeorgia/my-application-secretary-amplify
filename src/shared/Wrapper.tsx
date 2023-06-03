import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { palette } from '@/theme/theme';

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
        backgroundColor: `${palette.primary.main} !important}`,
        height: '100vh'
      }}
      style={{ height: '100vh' }}
    >
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default Wrapper;
