const express = require('express');
const router = express.Router();
const { dynamo } = require('../utils-factory/dynamo');
const { rateLimiter } = require('../util/rate-limiter');
const { handleAPIError } = require('../util/response');
const { apiGateway } = require('../utils-factory/api-gateway');
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
    newAppUserInfo = await apiGateway.createApiKey(newAppUserInfo);
    await dynamo.putItem(newAppUserInfo);
    success = true;
    log.info(
      `user with identifier: ${newAppUserInfo?.identifier} successfully created and added to usage plan`
    );
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
    const { currentAppUser: currentAppUserInfo } = req ?? {};
    const {
      key: currentKey,
      keyId: currentKeyId,
      usagePlanId: usagePlanId,
      ...currentAppUser
    } = currentAppUserInfo ?? {};
    const { updatedAt, createdAt, ...newAppUserInfo } = {
      ...currentAppUser,
      ...req.body
    };

    let response = currentAppUser;
    let success = false;

    if (!currentAppUserInfo) {
      //currentAppUser should be null.
      success = await createUser(newAppUserInfo);
      const { key, keyId, usagePlanId, ...info } = newAppUserInfo;
      response = info;
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
router.delete('', async function (req, res) {
  try {
    const { currentAppUser } = req ?? {};
    let response;
    let success = false;

    if (currentAppUser) {
      try {
        const { identifier, keyId, usagePlanId } = currentAppUser;
        await dynamo.deleteItem(identifier);
        await apiGateway.deleteApiKey(keyId, usagePlanId);
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

module.exports.userRoutes = router;
