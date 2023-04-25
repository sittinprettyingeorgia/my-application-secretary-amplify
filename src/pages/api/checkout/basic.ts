import { handleAPIError } from '@/util/response';
import { Auth } from 'aws-amplify';
import stripeUtil from '@/service/stripe';

import log from 'loglevel';

log.setLevel('info');

const basic = async (res: any, req: any) => {
  try {
    if (req.method !== 'GET') {
      throw new Error('Invalid request method');
    }

    log.info(`customer attempting Basic Plan purchase`);

    const paymentIntent = await stripeUtil.createPaymentIntent('basic');

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (e) {
    log.error(e);
    handleAPIError(res, 'BASIC PLAN PURCHASE FAILED::');
  }
};

export default basic;
