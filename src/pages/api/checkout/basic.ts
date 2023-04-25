import { handleAPIError } from '@/util/response';
import stripeUtil from '@/service/stripe';

import log from 'loglevel';

log.setLevel('info');

const basic = async (req: any, res: any) => {
  try {
    if (req.method !== 'GET') {
      throw new Error('Invalid request method');
    }

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
