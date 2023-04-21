import Footer from '@/shared/Footer';
import Navbar from '@/shared/Navbar';
import theme from '@/theme';
import {
  Container,
  Box,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Link,
  Tooltip,
  styled
} from '@mui/material';
import { palette } from '@/theme/theme';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const tertiary = {
  [theme.breakpoints.up('sm')]: {
    textAlign: 'right'
  }
};

const actions = {
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3)
  }
};

const LoginContainer = () => {
  return (
    <Container
      maxWidth='xs'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 120px)'
      }}
    >
      <Box pt={8} pb={10}>
        <Box mb={3} textAlign='center' sx={{ margin: '1rem' }}>
          <Link href='#' color='inherit'>
            <img
              src='mui-assets/img/logo-pied-piper-icon.png'
              alt=''
              width='40'
            />
          </Link>
          <Typography variant='h2' component='h2'>
            Login
          </Typography>
          <Box>
            <Tooltip title='Login with Google'>
              <IconButton aria-label='Google login'>
                <GoogleIcon sx={{ color: palette.secondary.dark }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Login with Facebook'>
              <IconButton aria-label='Facebook login'>
                <FacebookIcon sx={{ color: palette.secondary.dark }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Login with Instagram'>
              <IconButton aria-label='Instagram login'>
                <InstagramIcon sx={{ color: palette.secondary.dark }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='email'
                  id='email'
                  label='Email address'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  id='password'
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>
            <Box my={2}>
              <Button type='submit' fullWidth variant='login'>
                Login
              </Button>
            </Box>
            <Grid container spacing={2} sx={actions}>
              <Grid item xs={12} sm={6}>
                <Link href='/signUp'>Don&apos;t have an account?</Link>
              </Grid>
              <Grid item xs={12} sm={6} sx={tertiary}>
                <Link href='/forgotPassword'>Forgot password?</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

const Login = () => {
  return (
    <Box>
      <Navbar />
      <LoginContainer />
      <Footer />
    </Box>
  );
};

export default Login;
