import {
  Container,
  Box,
  Grid,
  Button,
  Card,
  Typography,
  CardActions,
  CardContent,
  CardHeader
} from '@mui/material';
import useTitle from '@/hooks/useTitle';
import { APP_NAME } from '@/appConstants';
import { useRouter } from 'next/router';
import Wrapper from '@/shared/Wrapper';

const Header = () => {
  return (
    <Container
      maxWidth='md'
      sx={{ marginTop: '5rem', width: '100%' }}
      disableGutters
    >
      <Box
        py={8}
        textAlign='center'
        sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}
      >
        <Typography variant='h3'>
          Don&apos;t waste time with the mundane.
        </Typography>
        <Typography variant='h3'>
          My Application Secretary can apply to hundreds of jobs on your behalf
          every day!
        </Typography>
      </Box>
    </Container>
  );
};

const Prices = () => {
  const router = useRouter();

  const handleSubscription = (plan: string) => {
    router.push(`/checkout?plan=${plan}`);
  };

  return (
    <Container maxWidth='lg' sx={{ marginBottom: '5rem' }} disableGutters>
      <Box pb={10} textAlign='center'>
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
              <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  variant='nav'
                  color='primary'
                  onClick={() => handleSubscription('basic')}
                >
                  Subscribe
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
              <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  variant='nav'
                  color='primary'
                  onClick={() => handleSubscription('preferred')}
                >
                  Subscribe
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
              <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  variant='nav'
                  color='primary'
                  onClick={() => handleSubscription('premium')}
                >
                  Subscribe
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const PricesPage = (props: any) => {
  useTitle(`${APP_NAME} | Pricing`);

  return (
    <Wrapper>
      <Header />
      <Prices />
    </Wrapper>
  );
};

export default PricesPage;
