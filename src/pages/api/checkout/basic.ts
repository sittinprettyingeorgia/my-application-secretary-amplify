import stripeUtil from '@/service/stripe';
import log from 'loglevel';
import { validateReq, handleAPIError } from '@/util/api';

log.setLevel('error');

const basic = async (req: any, res: any) => {
  try {
    validateReq(req);

    const paymentIntent = await stripeUtil.createPaymentIntent('basic');

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (e) {
    log.error(e);
    handleAPIError(res, 'BASIC PLAN PAYMENT INTENT FAILED::');
  }
};

export default basic;
