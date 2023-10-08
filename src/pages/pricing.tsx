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
import { useRouter } from 'next/router';
import Wrapper from '@/shared/Wrapper';
import { Cache } from 'aws-amplify';
import { PLANS } from '@/appConstants';

const Header = () => {
  return (
    <Container
      maxWidth='md'
      sx={{ marginTop: '3rem', width: '100%' }}
      disableGutters
    >
      <Box
        py={8}
        textAlign='center'
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Typography sx={{ fontSize: 48 }}>
          My Application Secretary can apply to hundreds of jobs on your behalf
          every day!
        </Typography>
      </Box>
    </Container>
  );
};

const Prices = () => {
  const router = useRouter();
  useTitle('Pricing');

  const handleSubscription = async (plan: string) => {
    const path = `/checkout?plan=${plan}`;
    Cache.setItem('path', path);
    await router.push(path);
  };

  return (
    <Container maxWidth='lg' sx={{ marginBottom: '4rem' }}>
      <Box pb={10} textAlign='center'>
        <Box mb={6}>
          <Typography variant='h3' sx={{ marginTop: '2rem' }}>
            Starting at just $15 a month
          </Typography>
          <Typography variant='h3' sx={{ marginTop: '1.5rem' }}>
            Cancel anytime.
          </Typography>
        </Box>
        <Grid container={true} spacing={4} alignItems='flex-end'>
          {Object.entries(PLANS).map(([name, { cost, limit }]) => {
            return (
              <Grid item xs={12} md={4} key={name}>
                <Card>
                  <CardHeader
                    title={`${name.charAt(0).toUpperCase()}${name.slice(1)}`}
                  ></CardHeader>
                  <CardContent>
                    <Box pt={2} pb={1} px={1}>
                      <Typography
                        variant='h4'
                        component='h2'
                        gutterBottom={true}
                      >
                        ${cost / 100}
                        <Typography variant='h6' color='black' component='span'>
                          / month
                        </Typography>
                      </Typography>
                      <Typography variant='body1'>
                        {limit} applications per day.
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
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
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

const PricesPage = () => {
  return (
    <Wrapper>
      <Header />
      <Prices />
    </Wrapper>
  );
};

export default PricesPage;
