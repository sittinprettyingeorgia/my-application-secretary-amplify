import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutForm from '@/shared/CheckoutForm';
import axios from 'axios';
import useData from '@/hooks/useData';
import CircularProgress from '@mui/material/CircularProgress';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  action: string;
};

const Checkout = (props: Props) => {
  const router = useRouter();
  const { plan } = router.query;
  const { data, isLoading, error } = useData({
    path: `/checkout/${plan}`,
    method: 'get'
  });
  const [clientSecret, setClientSecret] = useState(data?.clientSecret);

  const options = {
    clientSecret
  };

  if (isLoading) {
    return <CircularProgress color='secondary' />;
  }

  return (
    <div className='App'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
