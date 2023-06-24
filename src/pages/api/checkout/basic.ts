import stripeUtil from '@/service/stripe';
import log from 'loglevel';
import { validateReq, handleAPIError } from '@/util/api';

log.setLevel('error');

// Extract the core logic of the basic function into a new function
export const createBasicPaymentIntent = async (req: any) => {
  validateReq(req);
  const paymentIntent = await stripeUtil.createPaymentIntent('basic');
  return {
    clientSecret: paymentIntent.client_secret
  };
};

const basic = async (req: any, res: any) => {
  try {
    const result = await createBasicPaymentIntent(req);
    res.send(result);
  } catch (e) {
    handleAPIError(res, e, 'BASIC PLAN PAYMENT INTENT FAILED::');
  }
};

export default basic;
