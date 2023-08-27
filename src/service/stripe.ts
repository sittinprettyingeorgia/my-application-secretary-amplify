import { SSMClient } from '@aws-sdk/client-ssm';
import ClientSSMUtil from './ssm';
import Stripe from 'stripe';

const getSSM = () => {
  const client_ssm = new SSMClient({
    region: process.env.REGION
  });

  return client_ssm;
};

const getStripe = async () => {
  const client_ssm = new ClientSSMUtil(getSSM());
  const stripeSecret = await client_ssm.getStripeSecret();
  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2022-11-15'
  });
  return stripe;
};

class StripeUtil {
  stripe: Stripe | null;

  constructor() {
    this.stripe = null;
  }

  async getStripe() {
    if (!this.stripe) {
      this.stripe = await getStripe();
    }

    return this.stripe;
  }

  async createPaymentIntent(plan: string, identifier: string, email: string) {
    if (!identifier || !email || !plan) {
      throw new Error('Invalid parameters');
    }

    let amount;

    switch (plan) {
      case 'basic':
        amount = 2000;
        break;
      case 'preferred':
        amount = 5000;
        break;
      case 'premium':
        amount = 29900;
        break;
      default:
        throw new Error('Invalid plan');
    }

    const stripe = await this.getStripe();
    // Create a PaymentIntent with the order amount and currency
    return stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { tier: plan?.toUpperCase(), identifier, email },
      automatic_payment_methods: {
        enabled: true
      }
    });
  }
}

export default StripeUtil;
