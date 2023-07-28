import StripeUtil from '@/service/stripe';
import { validateReq } from './api';
import log from 'loglevel';

log.setLevel('error');

export const createPaymentIntent = async (req: any, type: string) => {
  try {
    validateReq(req);
    const stripeUtil = new StripeUtil();
    const paymentIntent = await stripeUtil.createPaymentIntent(type);

    return {
      clientSecret: paymentIntent.client_secret
    };
  } catch (e) {
    log.error(e);
  }
};
