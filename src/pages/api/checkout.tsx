import { handleAPIError } from '@/util/response';
import { Auth } from 'aws-amplify';
import getStripe from '../../service/stripe';

import log from 'loglevel';

log.setLevel('info');

const checkout = async (res: any, req: any) => {
  try {
    if (req.method === 'POST') {
      const { price_id } = req.body;
      log.info(`customer attempting purchase:${price_id}`);

      const stripe = await getStripe();
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: price_id,
            quantity: 1
          }
        ],
        mode: 'subscription',
        success_url: `${process.env.DOMAIN}/success`,
        cancel_url: `${process.env.DOMAIN}/cancel`,
        automatic_tax: { enabled: false }
      });

      res.redirect(303, session.url);
    }
  } catch (e) {
    log.error(e);
    handleAPIError(res, 'PURCHASE FAILED::');
  }
};

export default checkout;
