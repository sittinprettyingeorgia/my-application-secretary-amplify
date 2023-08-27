import { createPaymentIntent } from '@/util/stripe';

const handleCheckout = async (req: any, res: any) => {
  const result = await createPaymentIntent(req, req.query.plan);
  res.status(200).json(result);
};

export default handleCheckout;
