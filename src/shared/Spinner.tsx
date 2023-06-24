import { Container, CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh' // set the height of the container to be full height
      }}
    >
      <CircularProgress size={'5rem'} />
    </Container>
  );
};

export default Spinner;
