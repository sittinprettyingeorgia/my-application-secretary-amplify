import { Container } from '@mui/material';
import React from 'react';
import RequireAuth from './RequireAuth';

type Props = {
  children?: React.ReactNode;
  sx?: any;
  removeNav?: boolean;
};

const AuthWrapper = ({ children, sx }: Props): JSX.Element => {
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
      <RequireAuth>{children}</RequireAuth>
    </Container>
  );
};

export default AuthWrapper;
