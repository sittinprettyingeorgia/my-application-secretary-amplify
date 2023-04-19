import {
  Container,
  Box,
  Grid,
  Button,
  Card,
  Typography,
  IconButton,
  CardActions,
  CardContent,
  CardHeader
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';
import useTitle from '@/hooks/useTitle';

const Header = () => {
  return (
    <>
      <Container maxWidth='md' sx={{ marginTop: '10rem' }}>
        <Box py={8} textAlign='center'>
          <Typography variant='overline' component='span'>
            Free up your time
          </Typography>
          <Typography variant='h3'>
            My Application Secretary can apply to hundreds of jobs on your
            behalf every day. Don&apos;t waste time with the mundane.
          </Typography>
          <Box mt={4}>
            <Typography>Read More</Typography>
            <IconButton color='primary'>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};

const Prices = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Box pt={8} pb={10} textAlign='center'>
          <Box mb={6}>
            <Typography variant='h4' component='h2' gutterBottom={true}>
              Our plans
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              Starting at just $20/month. Cancel anytime.
            </Typography>
          </Box>
          <Grid container={true} spacing={4} alignItems='flex-end'>
            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title='Basic'></CardHeader>
                <CardContent>
                  <Box pt={2} pb={1} px={1}>
                    <Typography variant='h4' component='h2' gutterBottom={true}>
                      $20
                      <Typography
                        variant='h6'
                        color='textSecondary'
                        component='span'
                      >
                        / mo
                      </Typography>
                    </Typography>
                    <Typography variant='body1' component='p'>
                      20 applications per day.
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button variant='outlined' fullWidth color='primary'>
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title='Preferred'
                  subheader='Most popular'
                ></CardHeader>
                <CardContent>
                  <Box pt={2} pb={1} px={1}>
                    <Typography variant='h3' component='h2' gutterBottom={true}>
                      $50
                      <Typography
                        variant='h6'
                        color='textSecondary'
                        component='span'
                      >
                        / mo
                      </Typography>
                    </Typography>
                    <Typography variant='body1' component='p'>
                      100 applications per day.
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button variant='outlined' fullWidth color='primary'>
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title='Premium'></CardHeader>
                <CardContent>
                  <Box pt={2} pb={1} px={1}>
                    <Typography variant='h4' component='h2' gutterBottom={true}>
                      $299
                      <Typography
                        variant='h6'
                        color='textSecondary'
                        component='span'
                      >
                        / mo
                      </Typography>
                    </Typography>
                    <Typography variant='body1' component='p'>
                      500 applications per day.
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button variant='outlined' fullWidth color='primary'>
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

const PricesPage = (props: any) => {
  useTitle('My Application Secretary');
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Header />
      <Prices />
      <Footer />
    </Box>
  );
};

export default PricesPage;
