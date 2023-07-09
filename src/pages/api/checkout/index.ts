import { validateReq, handleAPIError } from '@/util/api';
import { createPaymentIntent } from '@/util/stripe';

const handleCheckout = async (req: any, res: any) => {
  let result;

  try {
    validateReq(req);
    result = await createPaymentIntent(req, req.query.plan);
  } catch (e) {
    handleAPIError(res, e, 'PAYMENT INTENT FAILED::');
  }

  res.status(200).json(result);
};

export default handleCheckout;
