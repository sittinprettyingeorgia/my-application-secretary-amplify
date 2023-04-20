import Footer from '@/shared/Footer';
import Navbar from '@/shared/Navbar';
import theme from '@/theme/theme';
import {
  Container,
  Box,
  Grid,
  Card,
  Typography,
  CardActionArea,
  CardMedia
} from '@mui/material';

const stepContainer = {
  marginBottom: theme.spacing(4)
};

const switchOrder0 = {
  [theme.breakpoints.up('md')]: {
    textAlign: 'right',
    order: 0
  }
};

const switchOrder1 = {
  [theme.breakpoints.up('md')]: {
    order: 1
  }
};

const media = {
  height: '256px'
};

const HowItWorks = () => {
  return (
    <section style={{ margin: '5rem' }}>
      <Container maxWidth='sm'>
        <Box pt={8} textAlign='center'>
          <Typography variant='h4' component='h2' gutterBottom={true}>
            My Application Secretary Setup
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            We&apos;ve designed onboarding to be as simple as possible.
            Here&apos;s how it works.
          </Typography>
        </Box>
      </Container>
      <Container maxWidth='md'>
        <Box pt={8} pb={10}>
          <Grid container spacing={6} sx={stepContainer}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea href='#'>
                  <CardMedia
                    sx={media}
                    image='https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display='flex' height='100%'>
                <Box my='auto'>
                  <Typography variant='h2' component='h3'>
                    01
                  </Typography>
                  <Typography variant='h4' component='h2' gutterBottom={true}>
                    Move Data
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    paragraph={true}
                  >
                    Using our Piper Assistant application, you can move your
                    data to be stored our decentralized network with simple drag
                    & drop.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6} sx={stepContainer}>
            <Grid item xs={12} md={6} sx={switchOrder1}>
              <Card>
                <CardActionArea href='#'>
                  <CardMedia
                    sx={media}
                    image='https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} sx={switchOrder0}>
              <Box display='flex' height='100%'>
                <Box my='auto'>
                  <Typography variant='h2' component='h3'>
                    02
                  </Typography>
                  <Typography variant='h4' component='h2' gutterBottom={true}>
                    Integrate Software
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    paragraph={true}
                  >
                    We want to make sure that you can keep using the software
                    that you use to manage your business.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea href='#'>
                  <CardMedia
                    sx={media}
                    image='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display='flex' height='100%'>
                <Box my='auto'>
                  <Typography variant='h2' component='h3'>
                    03
                  </Typography>
                  <Typography variant='h4' component='h2' gutterBottom={true}>
                    Ongoing Support
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    paragraph={true}
                  >
                    As with all innovative technologies, sometimes unpredictable
                    things will happen, and you can always count on our support
                    to solve issues for you.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

const FAQ = () => {
  return (
    <Box sx={{ overflow: 'scroll' }}>
      <Navbar />
      <HowItWorks />
      <Footer />
    </Box>
  );
};

export default FAQ;
