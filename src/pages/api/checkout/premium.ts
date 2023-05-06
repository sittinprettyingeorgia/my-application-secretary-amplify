import { validateReq, handleAPIError } from '@/util/api';
import stripeUtil from '@/service/stripe';

import log from 'loglevel';

log.setLevel('info');

const premium = async (req: any, res: any) => {
  try {
    validateReq(req);

    const paymentIntent = await stripeUtil.createPaymentIntent('premium');

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (e) {
    log.error(e);
    handleAPIError(res, 'PREMIUM PLAN PAYMENT INTENT FAILED::');
  }
};

export default premium;
