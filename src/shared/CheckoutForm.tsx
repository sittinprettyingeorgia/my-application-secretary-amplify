import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js/types/stripe-js/elements/payment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { palette } from '@/theme/theme';

type Props = {
  email: string;
};

const CheckoutForm = ({ email }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/checkout/success',
        receipt_email: email
      }
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false
    },
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
    business: {
      name: 'Blake Software LLC'
    }
  };

  return (
    <Box sx={{ height: '90%', border: '5px solid black' }}>
      <form id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' options={paymentElementOptions} />
        <Button
          variant='pay'
          disabled={isLoading || !stripe || !elements}
          id='submit'
        >
          <span id='button-text'>
            {isLoading ? <CircularProgress color='secondary' /> : 'Pay Now'}
          </span>
        </Button>
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </Box>
  );
};

export default CheckoutForm;
