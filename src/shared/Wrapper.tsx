import { Container } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar from './navbar/Navbar';

type Props = {
  children?: React.ReactNode;
  sx?: any;
  removeNav?: boolean;
};

const Wrapper = ({ children, sx, removeNav }: Props): JSX.Element => {
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
      {!removeNav && <Navbar />}
      {children}
      {!removeNav && <Footer />}
    </Container>
  );
};

export default Wrapper;
