import { handleAPIError } from '@/util/response';
import log from 'loglevel';

log.setLevel('info');

const handlePaymentIntentSucceeded = (paymentIntent: any) => {
  //TODO: isActive should be turned true
  // update using graphql our user
};
const handlePaymentMethodAttached = (paymentMethod: any) => {
  //TODO: whatever this is
};

const webhook = async (res: any, req: any) => {
  try {
    const event = req.body;
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        log.info(
          `PaymentIntent for ${event.data.object.amount} was successful!`
        );
        handlePaymentIntentSucceeded(event.data.object);
        break;
      case 'payment_method.attached':
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        handlePaymentMethodAttached(event.data.object);
        break;
      default:
        // Unexpected event type
        log.error(`Unhandled event type ${event.type}.`);
    }
  } catch (e: any) {
    log.error(e);
    handleAPIError(res, e?.message);
  }
};

export default webhook;
