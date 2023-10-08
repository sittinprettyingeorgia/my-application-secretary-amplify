import { SSMClient } from '@aws-sdk/client-ssm';
import ClientSSMUtil from './ssm';
import Stripe from 'stripe';
import { PLANS } from '@/appConstants';

const getSSM = () => {
  return new SSMClient({
    region: process.env.REGION
  });
};

const getStripe = async () => {
  const client_ssm = new ClientSSMUtil(getSSM());
  const stripeSecret = await client_ssm.getStripeSecret();
  return new Stripe(stripeSecret, {
    apiVersion: '2022-11-15'
  });
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

    const planInfo = PLANS[plan];
    if (!planInfo) {
      throw new Error('Invalid plan');
    }

    const stripe = await this.getStripe();
    // Create a PaymentIntent with the order amount and currency
    return stripe.paymentIntents.create({
      amount: planInfo.cost,
      currency: 'usd',
      metadata: { tier: plan?.toUpperCase(), identifier, email },
      automatic_payment_methods: {
        enabled: true
      }
    });
  }
}

export default StripeUtil;
