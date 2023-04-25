import { handleAPIError } from '@/util/response';
import stripeUtil from '@/service/stripe';

import log from 'loglevel';

log.setLevel('info');

const premium = async (res: any, req: any) => {
  try {
    if (req.method !== 'GET') {
      throw new Error('Invalid request method');
    }

    log.info(`customer attempting Premium Plan purchase`);

    const paymentIntent = await stripeUtil.createPaymentIntent('premium');

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (e) {
    log.error(e);
    handleAPIError(res, 'PREMIUM PLAN PURCHASE FAILED::');
  }
};

export default premium;
