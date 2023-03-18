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

/**********************
 * READ *
 **********************/
router.get('', async function (req, res) {
  try {
    const { currentAppUser } = req ?? {};
    const { jobLinks, id, isActive, owner, ...rest } = currentAppUser ?? {};
    let success = currentAppUser ? true : false;

    res.json({
      success,
      response: success ? rest : 'There was an error retrieving the user'
    });
  } catch (e) {
    handleAPIError(res, e, 'There was an error retrieving the user');
  }
});

router.get('/jobLink', async (req, res) => {
  try {
    const { currentAppUser, Username } = req ?? {};
    const { statusCode } = await rateLimiter.rateLimit(Username);

    const getJobLink = async () => {
      const { updatedAt, createdAt, ...user } = currentAppUser ?? {};
      const response = user?.jobLinks?.pop();

      // update job link list
      await dynamo.putItem(user);
      res.status(200).json({ success: true, response });
    };

    switch (statusCode) {
      case 429:
        res.status(statusCode).json({
          success: false,
          response: 'You have reached your rate limit'
        });
        break;
      case 500:
        res.status(statusCode).json({
          success: false,
          response: 'The resource is unavailable at this time'
        });
        break;
      case 200:
        await getJobLink();
        break;
    }
  } catch (e) {
    handleAPIError(res, e, 'Could not validate rate limit');
  }
});

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

        newAppUserInfo.key = uuid;
        await dynamo.putItem(newAppUserInfo);
        success = true;
      } catch (e) {
        log.error(e);
      }
    }

    res.json({ success, response });
  } catch (e) {
    handleAPIError(res, e, 'Could not create a user');
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
