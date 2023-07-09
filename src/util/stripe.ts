import stripeUtil from '@/service/stripe';
import { validateReq } from './api';

export const createPaymentIntent = async (req: any, type: string) => {
  validateReq(req);
  const paymentIntent = await stripeUtil.createPaymentIntent(type);
  return {
    clientSecret: paymentIntent.client_secret
  };
};
