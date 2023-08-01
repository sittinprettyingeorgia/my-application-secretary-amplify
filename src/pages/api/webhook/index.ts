import { handleAPIError } from '@/util/api';
import apiGateway from '@/util/api-gateway';
import dynamo from '@/util/dynamo';
import log from 'loglevel';

log.setLevel('info');

const createNewUser = async (newAppUserInfo: any) => {
  const success = true;

  newAppUserInfo = await apiGateway.createApiKey(newAppUserInfo); // also adds usage plan id.
  await dynamo.putItem(newAppUserInfo);

  log.info(
    `user with identifier: ${newAppUserInfo?.identifier} successfully created and added to usage plan`
  );

  return success;
};

const handlePaymentIntentSucceeded = async (paymentIntent: any) => {
  const { subscriptionTier, identifier, email } = paymentIntent?.metadata ?? {};

  const newBaseUser = {
    identifier,
    isActive: true,
    subscriptionType: 'MONTHLY',
    subscriptionTier,
    firstName: 'default',
    lastName: 'default',
    email,
    jobPostingInProgress: false,
    jobLinkCollectionInProgress: false,
    apiKey: '',
    apiKeyId: '',
    usagePlanId: ''
  };

  switch (paymentIntent.amount) {
    case String(20):
      await createNewUser(newBaseUser);
      return;
  }
  // update using dynamoddb
};
const handlePaymentMethodAttached = (_paymentMethod: any) => {
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
    handleAPIError(res, e, e?.message);
  }
};

export default webhook;
