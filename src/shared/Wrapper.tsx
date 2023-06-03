import { Container } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

type Props = {
  children?: React.ReactNode;
  sx?: any;
};

const Wrapper = ({ children, sx }: Props): JSX.Element => {
  return (
    <Container
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      style={{ height: '100vh' }}
    >
      <Navbar />
      {children}
      <Footer />
    </Container>
  );
};

export default Wrapper;
