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
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title='Basic'></CardHeader>
              <CardContent>
                <Box pt={2} pb={1} px={1}>
                  <Typography variant='h4' component='h2' gutterBottom={true}>
                    $15
                    <Typography variant='h6' color='black' component='span'>
                      / month
                    </Typography>
                  </Typography>
                  <Typography variant='body1'>
                    50 applications per day.
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
                sx={{
                  '& .MuiCardHeader-subheader': {
                    color: 'black'
                  }
                }}
              />
              <CardContent>
                <Box pt={2} pb={1} px={1}>
                  <Typography variant='h3' component='h2' gutterBottom={true}>
                    $45
                    <Typography variant='h6' component='span' color='black'>
                      / month
                    </Typography>
                  </Typography>
                  <Typography>200 applications per day.</Typography>
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
                    $99
                    <Typography variant='h6' color='black' component='span'>
                      / month
                    </Typography>
                  </Typography>
                  <Typography>500 applications per day.</Typography>
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

const PricesPage = () => {
  return (
    <Wrapper>
      <Header />
      <Prices />
    </Wrapper>
  );
};

export default PricesPage;
