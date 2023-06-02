import { Box } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

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
