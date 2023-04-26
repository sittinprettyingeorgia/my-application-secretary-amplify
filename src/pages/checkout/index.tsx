import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import CheckoutForm from '@/shared/CheckoutForm';
import useData from '@/hooks/useData';
import CircularProgress from '@mui/material/CircularProgress';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { AuthProps } from '@/types';
import { SignInHeader, SignInFooter, Footer } from '@/login';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { palette } from '@/theme/theme';
import AdbIcon from '@mui/icons-material/Adb';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const style = {
  width: '50%',
  padding: '0',
  margin: '0'
};

const getPlanName = (plan: string) => {
  if (!plan) {
    return;
  }

  switch (plan) {
    case 'basic':
      return 'Basic';
    case 'premium':
      return 'Premium';
    case 'preferred':
      return 'Preferred';
    default:
      throw new Error('That plan type does not exist');
  }
};

const Checkout = ({ isPassedToWithAuthenticator, user }: AuthProps) => {
  const router = useRouter();
  const { plan } = router.query;
  const { data, isLoading } = useData({
    path: `checkout/${plan}`,
    method: 'GET'
  });

  const { clientSecret } = data ?? {};

  if (isLoading || !user) {
    return <CircularProgress color='secondary' />;
  }

  const planName = getPlanName(plan as string);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        justifyContent: 'space-between',
        backgroundColor: palette.secondary.dark,
        margin: 0,
        padding: 0
      }}
      disableGutters
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          marginTop: 0
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
            marginTop: '3rem'
          }}
        >
          <AdbIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              color: `${palette.primary.main}`
            }}
          />
          <Typography variant='h3' color='primary'>
            My Application Secretary
          </Typography>
        </Box>
        <Typography
          variant='h1'
          color='primary'
          sx={{ marginTop: '10%', fontWeight: 600, fontSize: 160 }}
        >
          {planName} Plan
        </Typography>
      </Box>
      <Box sx={{ ...style, display: 'flex', flexDirection: 'row' }}>
        {clientSecret && (
          <Elements
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe'
              }
            }}
            stripe={stripePromise}
          >
            <CheckoutForm />
          </Elements>
        )}
      </Box>
    </Container>
  );
};

const CheckoutWithAuth = withAuthenticator(Checkout, {
  components: {
    //Header: Header, this should be custom logo
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  },
  socialProviders: ['google'] //TODO: add facebook, apple, amazon, etc logins.
});

export default CheckoutWithAuth;

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true
    }
  };
}
