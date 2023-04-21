import ssm from './ssm';
import Stripe from 'stripe';

const getStripe = async () => {
  const stripeSecret = await ssm.getStripeSecret();
  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2022-11-15'
  });
  return stripe;
};

export default getStripe;
