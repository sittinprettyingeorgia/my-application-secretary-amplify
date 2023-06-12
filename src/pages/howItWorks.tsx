import { APP_NAME } from '@/appConstants';
import useTitle from '@/hooks/useTitle';
import Wrapper from '@/shared/Wrapper';
import theme from '@/theme/theme';
import {
  Container,
  Box,
  Grid,
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  Button
} from '@mui/material';
import { useRouter } from 'next/router';

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

const HowItWorksInner = () => {
  const router = useRouter();

  const handleGetStarted = async () => {
    await router.push('/pricing');
  };

  return (
    <Container style={{ height: '100%' }}>
      <Container maxWidth='sm'>
        <Box pt={8} textAlign='center'>
          <Typography variant='h5'>
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
                    1
                  </Typography>
                  <Typography variant='h4' component='h2' gutterBottom={true}>
                    Upload Your Resume
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    paragraph={true}
                  >
                    My Application Secretary will use Natural Language
                    Processing to lift qualifications and experiences from your
                    resume.
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
                    2
                  </Typography>
                  <Typography variant='h4' component='h2' gutterBottom={true}>
                    Verify your job preferences
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    paragraph={true}
                  >
                    We want to make sure you are exposed to opportunities that
                    best fit your needs. So My Application Secretary needs to
                    understand your goals just a little better.
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
                    3
                  </Typography>
                  <Typography variant='h4' component='h2' gutterBottom={true}>
                    Install our chrome extension.
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    paragraph={true}
                  >
                    My Application Secretary will communicate with our chrome
                    extension to take control of your browser and search and
                    apply to jobs.
                  </Typography>
                  <Button
                    variant='nav'
                    sx={{ marginLeft: '80%', marginTop: '10%', width: '50%' }}
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};

const HowItWorks = () => {
  useTitle(`${APP_NAME} | How It Works`);

  return (
    <Wrapper>
      <HowItWorksInner />
    </Wrapper>
  );
};

export default HowItWorks;
