import { Box } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar, { Page } from './Navbar';

type Props = {
  children?: React.ReactNode;
  sx?: any;
  pages?: Page[];
};

const Wrapper = ({ pages, children, sx }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Navbar pages={pages} />
      {children}
      <Footer />
    </Box>
  );
};

export default Wrapper;
