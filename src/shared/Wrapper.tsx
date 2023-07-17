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
        height: '100vh',
        width: '100vw',
        '@media (min-width: 768px)': {
          // Media query for desktop
        }
      }}
    >
      <Navbar />
      {children}
      <Footer />
    </Container>
  );
};

export default Wrapper;
