import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import CheckoutForm from '@/shared/CheckoutForm';
import useData from '@/hooks/useData';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { palette } from '@/theme/theme';
import RequireAuth from '@/shared/RequireAuth';
import { useUserContext } from '@/context/UserContext';
import Spinner from '@/shared/Spinner';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const getPlanName = (
  plan: string
): { type: string; cost: string; features: string[] } | void => {
  if (!plan) {
    return;
  }

  switch (plan) {
    case 'basic':
      return {
        type: 'Basic Plan',
        cost: '$20.00',
        features: ['up to 20 applications/day']
      };
    case 'preferred':
      return {
        type: 'Preferred Plan',
        cost: '$50.00',
        features: ['up to 100 applications/day']
      };
    case 'premium':
      return {
        type: 'Premium Plan',
        cost: '$299.00',
        features: ['up to 500 applications/day']
      };
    default:
      throw new Error('That plan type does not exist');
  }
};

const CheckoutPage = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const { plan } = router.query;
  const { data, isLoading } = useData({
    path: `checkout/${plan}`,
    method: 'GET'
  });

  const { clientSecret } = data ?? {}; //

  if (isLoading || !user) {
    return <Spinner />;
  }

  const { type, cost, features } = getPlanName(plan as string) ?? {};

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: palette.secondary.dark,
        margin: 0,
        padding: 0,
        '@media (max-width: 1060px)': {
          flexDirection: 'column',
          height: '100%'
        }
      }}
      disableGutters
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90%',
          padding: '1rem',
          margin: 'auto',
          '@media (max-width: 1060px)': {
            height: '30%'
          }
        }}
      >
        <Typography
          color='primary'
          sx={{
            fontWeight: 600,
            fontSize: '5rem',
            '@media (max-width: 500px)': {
              fontSize: '3rem'
            }
          }}
        >
          {type}
        </Typography>
        <Typography
          color='primary'
          sx={{
            fontWeight: 600,
            fontSize: '6rem',
            '@media (max-width: 500px)': {
              fontSize: '4rem'
            }
          }}
        >
          {cost}
        </Typography>
        <Typography
          color='primary'
          sx={{
            fontWeight: 600,
            fontSize: '2rem',
            '@media (max-width: 500px)': {
              fontSize: '2rem'
            }
          }}
        >
          {features?.map(feature => (
            <p key={feature}>{feature}</p>
          ))}
        </Typography>
      </Box>

      <Box
        sx={{
          width: '50%',
          display: 'flex',
          backgroundColor: `#cccaca`,
          alignItems: 'center',
          justifyContent: 'center',
          '@media (max-width: 1060px)': {
            width: '100%',
            height: '70%'
          }
        }}
      >
        <Box
          sx={{
            padding: '1rem',
            width: '80%'
          }}
        >
          {clientSecret && (
            <Elements
              options={{
                clientSecret,
                appearance: {
                  theme: 'none',
                  labels: 'floating',
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
                      color: `${palette.secondary.light}`
                    },
                    '.TabLabel': {
                      color: `${palette.secondary.dark}`
                    },
                    '.TabIcon': {
                      color: `${palette.secondary.dark}`
                    },
                    '#submit': {
                      backgroundColor: `${palette.secondary.dark}`
                    }
                  },
                  variables: {
                    borderRadius: '4px',
                    fontFamily: 'Josefin Slab',
                    colorDanger: 'red'
                  }
                }
              }}
              stripe={stripePromise}
            >
              <CheckoutForm email={`${user?.attributes?.email}`} />
            </Elements>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const Checkout = () => {
  return (
    <RequireAuth>
      <CheckoutPage />
    </RequireAuth>
  );
};

export default Checkout;
