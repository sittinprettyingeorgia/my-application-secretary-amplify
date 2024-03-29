import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { palette } from '@/theme/theme';
import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';

type Props = {
  email: string;
};

const CheckoutForm = ({ email }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [checked, setChecked] = React.useState(false);
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

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
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
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 1060px)': {
          width: '100%',
          height: '70vh'
        },
        '@media (max-width: 550px)': {
          width: '100%',
          height: '80vh'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '10vh',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}
      >
        <AdbIcon
          sx={{
            display: { md: 'flex' },
            mr: 1,
            color: `${palette.secondary.dark}`,
            textAlign: 'center'
          }}
        />
        <Tooltip title='go back to home page' placement='top'>
          <Link
            className='logoTitle'
            href='/'
            sx={{
              fontSize: '2rem',
              '@media (max-width: 550px)': {
                fontSize: '1.4rem'
              }
            }}
          >
            My Application Secretary
          </Link>
        </Tooltip>
      </Box>
      <form id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' options={paymentElementOptions} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FormControlLabel
            sx={{
              marginTop: '1rem'
            }}
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={
              <Typography
                sx={{
                  '@media (max-width: 550px)': {
                    fontSize: '1rem'
                  }
                }}
              >
                I accept the
                <Link href='/compliance/terms'> Terms of Service </Link>
                and <Link href='/compliance/privacy'> Privacy Policy </Link>
              </Typography>
            }
          />
          <Tooltip
            title='Please read and accept the terms of use and privacy policy'
            placement='top'
          >
            <span>
              <Button
                variant='pay'
                disabled={isLoading || !stripe || !elements || !checked}
                id='submit'
                sx={{
                  margin: '1rem',
                  '@media (max-width: 550px)': {
                    fontSize: '1rem'
                  }
                }}
              >
                <span id='button-text'>
                  {isLoading ? (
                    <CircularProgress color='secondary' />
                  ) : (
                    'Pay Now'
                  )}
                </span>
              </Button>
            </span>
          </Tooltip>
        </Box>
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </Box>
  );
};

export default CheckoutForm;
