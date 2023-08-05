import StripeUtil from '@/service/stripe';
import { validateGetReq } from './api';
import log from 'loglevel';
import { getCognitoUser } from '.';

log.setLevel('error');

export const createPaymentIntent = async (req: any, type: string) => {
  try {
    validateGetReq(req);
    const stripeUtil = new StripeUtil();
    const { Username = '', email = '' } = (await getCognitoUser(req)) ?? {};
    const paymentIntent = await stripeUtil.createPaymentIntent(
      type,
      Username,
      email
    );

    return {
      clientSecret: paymentIntent.client_secret
    };
  } catch (e) {
    log.error(e);
  }
};
