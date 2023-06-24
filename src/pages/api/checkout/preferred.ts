import stripeUtil from '@/service/stripe';
import log from 'loglevel';
import { validateReq, handleAPIError } from '@/util/api';

log.setLevel('error');

export const createPreferredPaymentIntent = async (req: any) => {
  validateReq(req);
  const paymentIntent = await stripeUtil.createPaymentIntent('preferred');
  return {
    clientSecret: paymentIntent.client_secret
  };
};

const preferred = async (req: any, res: any) => {
  try {
    validateReq(req);

    const result = await createPreferredPaymentIntent(req);

    res.send(result);
  } catch (e) {
    handleAPIError(res, e, 'PREFERRED PLAN PAYMENT INTENT FAILED::');
  }
};

export default preferred;
