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

const getPlanName = (
  plan: string
): { type: string; cost: string; feature: string } | void => {
  if (!plan) {
    return;
  }

  switch (plan) {
    case 'basic':
      return {
        type: 'Basic Plan',
        cost: '$20.00',
        feature: 'up to 20 applications/day'
      };
    case 'premium':
      return {
        type: 'Premium Plan',
        cost: '$50.00',
        feature: 'up to 100 applications/day'
      };
    case 'preferred':
      return {
        type: 'Preferred Plan',
        cost: '$299.00',
        feature: 'up to 500 applications/day'
      };
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

  const { type, cost, feature } = getPlanName(plan as string) ?? {};

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
          sx={{ marginTop: '10%', fontWeight: 600, fontSize: '10rem' }}
        >
          {type}
        </Typography>
        <Typography
          color='primary'
          sx={{ margin: 'auto', fontWeight: 600, fontSize: '8rem' }}
        >
          {cost}
        </Typography>
        <Typography
          color='primary'
          sx={{ margin: 'auto', fontWeight: 600, fontSize: '3rem' }}
        >
          {feature}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: `${palette.primary.main}`,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: `${palette.secondary.dark}`,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          {clientSecret && (
            <Elements
              options={{
                clientSecret,
                appearance: {
                  theme: 'none',
                  rules: {
                    '.Tab': {
                      border: `1px solid ${palette.primary.main}`,
                      backgroundColor: `${palette.primary.main}`,
                      boxShadow:
                        '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)'
                    },
                    '.p-TabLabel': {
                      color: `${palette.secondary.dark}`
                    },
                    '.Label': {
                      color: `${palette.primary.main}`
                    },
                    '.TabLabel': {
                      color: `${palette.secondary.dark}`
                    }
                  },
                  variables: {
                    borderRadius: '4px',
                    fontFamily: 'Josefin Slab'
                  }
                }
              }}
              stripe={stripePromise}
            >
              <CheckoutForm />
            </Elements>
          )}
        </Box>
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
