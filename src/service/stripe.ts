import ssm from './ssm';
import Stripe from 'stripe';

const getStripe = async () => {
  const stripeSecret = await ssm.getStripeSecret();
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

  async #getStripe() {
    if (!this.stripe) {
      this.stripe = await getStripe();
    }

    return this.stripe;
  }

  async createPaymentIntent(plan: string) {
    let amount;

    switch (plan) {
      case 'basic':
        amount = 20;
        break;
      case 'preferred':
        amount = 50;
        break;
      case 'premium':
        amount = 299;
        break;
      default:
        throw new Error('Invalid plan');
    }

    const stripe = await this.#getStripe();
    // Create a PaymentIntent with the order amount and currency
    return stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    });
  }
}

const stripeUtil = new StripeUtil();

export default stripeUtil;
