import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutForm from '@/shared/CheckoutForm';
import useData from '@/hooks/useData';
import CircularProgress from '@mui/material/CircularProgress';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { AuthProps } from '@/types';
import { SignInHeader, SignInFooter, Footer } from '@/login';
import Container from '@mui/material/Container';
import { isAuthenticated } from '@/util/auth';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = ({ isPassedToWithAuthenticator, user }: AuthProps) => {
  const router = useRouter();
  const { plan } = router.query;
  const { data, isLoading } = useData({
    path: `checkout/${plan}`,
    method: 'GET'
  });

  const { clientSecret } = data ?? {};

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (isLoading || !user) {
    return <CircularProgress color='secondary' />;
  }

  return (
    <Container sx={{ display: 'flex' }} disableGutters>
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
