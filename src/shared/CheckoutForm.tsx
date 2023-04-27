import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js/types/stripe-js/elements/payment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';

type Props = {
  email: string;
};

const CheckoutForm = ({ email }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [checked, setChecked] = React.useState(false);
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleDisabled = () => {
    console.log('hovering');
    if (!checked) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false
    },
    paymentMethodOrder: ['card', 'cashapp'],
    business: {
      name: 'Blake Software LLC'
    }
  };

  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <form id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' options={paymentElementOptions} />
        <FormControlLabel
          sx={{ margin: '1rem' }}
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label={
            <span>
              I accept the
              <Link href='/compliance/terms'> Terms of Service </Link>
              and <Link href='/compliance/privacy'> Privacy Policy </Link>
            </span>
          }
        />
        <Tooltip
          title='Please read and accept terms of use and privacy policy'
          placement='top'
        >
          <span onMouseEnter={handleDisabled}>
            <Button
              variant='pay'
              disabled={isLoading || !stripe || !elements || !checked}
              id='submit'
              sx={{
                margin: '3rem'
              }}
            >
              <span id='button-text'>
                {isLoading ? <CircularProgress color='secondary' /> : 'Pay Now'}
              </span>
            </Button>
          </span>
        </Tooltip>
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </Box>
  );
};

export default CheckoutForm;
