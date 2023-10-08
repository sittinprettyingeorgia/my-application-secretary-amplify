import { APP_NAME, ONBOARDING_STEPS } from '@/appConstants';
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

const lastStepContainer = { display: 'flex', justifyContent: 'center' };

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
  useTitle('How It Works');

  const handleGetStarted = async () => {
    await router.push('/pricing');
  };

  return (
    <Container style={{ height: '100%', width: '95vw' }}>
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
          {Object.entries(ONBOARDING_STEPS).map(
            ([title, { description, image }], step: number) => {
              return (
                <Grid
                  container
                  spacing={6}
                  sx={
                    step === Object.keys(ONBOARDING_STEPS)?.length - 1
                      ? lastStepContainer
                      : stepContainer
                  }
                  key={title}
                >
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardActionArea href='#'>
                        <CardMedia sx={media} image={image} />
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box display='flex' height='100%'>
                      <Box my='auto'>
                        <Typography variant='h2' component='h3'>
                          {step}
                        </Typography>
                        <Typography
                          variant='h4'
                          component='h2'
                          gutterBottom={true}
                        >
                          {title}
                        </Typography>
                        <Typography
                          variant='body1'
                          color='textSecondary'
                          paragraph={true}
                        >
                          {description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              );
            }
          )}
          <Grid
            container
            spacing={6}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant='nav'
              sx={{ marginTop: '5%', width: '50%' }}
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
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
