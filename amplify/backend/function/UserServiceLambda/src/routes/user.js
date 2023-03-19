const express = require('express');
const router = express.Router();
const { dynamo } = require('../database-factory/dynamo-client');
const { rateLimiter } = require('../util/rate-limiter');
const { handleAPIError } = require('../util/response');
const log = require('loglevel');
const {
  APIGatewayClient,
  CreateApiKeyCommand,
  CreateUsagePlanKeyCommand
} = require('@aws-sdk/client-api-gateway');
const { v4: uuidv4 } = require('uuid');

log.setLevel('info');
/**********************
 * READ *
 **********************/
router.get('', async function (req, res) {
  let errorMessage = 'There was an error retrieving the user';

  try {
    const { currentAppUser } = req ?? {};
    const { jobLinks, id, isActive, owner, ...rest } = currentAppUser ?? {};
    let success = currentAppUser ? true : false;

    res.json({
      success,
      response: success ? rest : errorMessage
    });
  } catch (e) {
    handleAPIError(res, e, errorMessage);
  }
});

const getJobLink = async (res, statusCode, currentAppUser) => {
  let success = false;
  let response = 'You have reached your rate limit';

  if (statusCode === 200) {
    const { updatedAt, createdAt, ...user } = currentAppUser ?? {};
    response = user?.jobLinks?.pop();

    // update job link list
    await dynamo.putItem(user);
    success = true;
  } else if (statusCode === 500) {
    response = 'The resource is unavailable at this time';
  }

  res.status(statusCode).json({ success, response });
};

router.get('/jobLink', async (req, res) => {
  try {
    const { currentAppUser, Username } = req ?? {};
    const { statusCode } = await rateLimiter.rateLimit(Username);

    await getJobLink(res, statusCode, currentAppUser);
  } catch (e) {
    handleAPIError(res, e, 'Could not validate rate limit');
  }
});

const createUser = async newAppUserInfo => {
  let success = false;
  try {
    const { subscriptionTier, identifier } = newAppUserInfo ?? {};
    const apigateway = new APIGatewayClient({
      region: process.env.REGION,
      httpOptions: {
        timeout: 3000
      }
    });
    const uuid = uuidv4();

    // Create an API key based on the user's subscriptionTier
    const apiKey = await apigateway.send(
      new CreateApiKeyCommand({
        name: `API key for ${identifier}`,
        enabled: true,
        generateDistinctId: true,
        value: uuid,
        tags: {
          subscriptionTier
        }
      })
    );
    const keyId = apiKey.id;
    log.info(`created api key for ${identifier}`);

    const tier = {
      BASIC: process.env.BASIC,
      PREFERRED: process.env.PREFERRED,
      PREMIUM: process.env.PREMIUM
    };
    // Add the API key to the usage plan
    const usagePlanId = tier[subscriptionTier];
    await apigateway.send(
      new CreateUsagePlanKeyCommand({
        usagePlanId,
        keyId,
        keyType: 'API_KEY'
      })
    );
    log.info('created usage plan key');

    newAppUserInfo.key = uuid;
    await dynamo.putItem(newAppUserInfo);
    success = true;
    log.info('user successfully created and added to usage plan');
  } catch (e) {
    log.error(e);
  }

  return success;
};

/****************************
 * CREATE *
 ****************************/
router.post('', async function (req, res) {
  try {
    const { currentAppUser } = req ?? {};
    const { updatedAt, createdAt, ...newAppUserInfo } = {
      ...currentAppUser,
      ...req.body
    };

    let response;
    let success = false;

    if (!currentAppUser) {
      success = await createUser(newAppUserInfo);
    }

    res.json({ success, response });
  } catch (e) {
    handleAPIError(res, e, 'Could not create a new user');
  }
});

/****************************
 * UPDATE *
 ****************************/
router.put('', async function (req, res) {
  try {
    const { currentAppUser } = req ?? {};
    const { updatedAt, createdAt, ...newAppUserInfo } = {
      ...currentAppUser,
      ...req.body
    };

    let response;
    let success = false;

    if (currentAppUser) {
      try {
        success = true;
      } catch (e) {
        console.log(e);
        log.error(e);
      }
    }

    res.json({ success, response });
  } catch (e) {
    handleAPIError(res, e, 'Could not create a user');
  }
});
/****************************
 * DELETE *
 ****************************/

module.exports.userRoutes = router;
