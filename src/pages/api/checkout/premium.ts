import { validateReq, handleAPIError } from '@/util/api';
import stripeUtil from '@/service/stripe';

import log from 'loglevel';
log.setLevel('info');

export const createPremiumPaymentIntent = async (req: any) => {
  validateReq(req);
  const paymentIntent = await stripeUtil.createPaymentIntent('preferred');
  return {
    clientSecret: paymentIntent.client_secret
  };
};

const premium = async (req: any, res: any) => {
  try {
    validateReq(req);

    const result = await createPremiumPaymentIntent(req);

    res.send(result);
  } catch (e) {
    handleAPIError(res, e, 'PREMIUM PLAN PAYMENT INTENT FAILED::');
  }
};

export default premium;
