const express = require('express');
const router = express.Router();
const { dynamo } = require('../utils-factory/dynamo');
const { rateLimiter } = require('../util/rate-limiter');
const { handleAPIError } = require('../util/response');
const { processQuestionsArray } = require('../util/old-nlp');
const { commonCorpus } = require('../corpus/personal');
const { apiGateway } = require('../utils-factory/api-gateway');
const { body, validationResult } = require('express-validator');
const log = require('loglevel');

log.setLevel('info');
const removeSensitive = user => {
  const {
    jobLinks,
    isActive,
    owner,
    corpus,
    apiKeyId,
    usagePlanId,
    apiKey,
    ...rest
  } = user ?? {};

  return rest;
};

/**********************
 * READ *
 **********************/
router.get('', async function (req, res) {
  let errorMessage = 'There was an error retrieving the user';

  try {
    const { currentAppUser } = req ?? {};
    const rest = removeSensitive(currentAppUser);
    let success = currentAppUser ? true : false;

    res.json({
      success,
      response: success ? rest : errorMessage
    });
  } catch (e) {
    handleAPIError(res, errorMessage);
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
    handleAPIError(res, 'Could not validate rate limit');
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

//TODO: this should eb done with graphql
/****************************
 * CREATE *
 ****************************/
router.post('', async function (req, res) {
  try {
    const { currentAppUser: currentAppUserInfo } = req ?? {};
    const currentAppUser = removeSensitive(currentAppUserInfo);
    const { updatedAt, createdAt, ...newAppUserInfo } = {
      ...currentAppUser,
      ...req.body
    };

    let response = currentAppUser;
    let success = false;

    if (!currentAppUserInfo) {
      success = await createUser({ ...newAppUserInfo, corpus: commonCorpus });
      response = removeSensitive(newAppUserInfo);
    }

    res.json({ success, response });
  } catch (e) {
    handleAPIError(res, 'Could not create a new user');
  }
});

//TODO: if a user wants to update subscriptionType or Tier, or other
// payment associated information they need to modify payment type/plan
// which will generate an auto-user-update trigger to modify those fields.
const JOB_PREFERENCES_EXAMPLE = {
  salary: 120000,
  jobType: 'full_time',
  expLvl: 'entry_level',
  remote: true,
  redFlags: ['currentCompanyName', 'Other_red_flag_words']
};
const isValidUrl = url => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

const validateJobLinks = value => {
  if (!Array.isArray(value)) {
    throw new Error('Job links must be an array');
  }

  const invalidUrls = value.filter(url => !isValidUrl(url));
  if (invalidUrls.length > 0) {
    throw new Error(`Invalid job link(s): ${invalidUrls.join(', ')}`);
  }

  // Return the validated value
  return value;
};
/****************************
 * UPDATE EXTENSION STATUS  *
 ****************************/
router.put(
  '',
  body('jobLinks')
    .custom(validateJobLinks)
    .withMessage('Job links must be an array of valid url addresses'),
  body('jobPostingInProgress')
    .isBoolean()
    .withMessage('jobPostingInProgress must be a boolean'),
  body('jobLinkCollectionInProgress')
    .isBoolean()
    .withMessage('jobLinkCollectionInProgress must be a boolean'),
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let response = 'Failed to update the user';
    let success = false;

    try {
      const { currentAppUser } = req ?? {};
      const { jobLinks, jobLinkCollectionInProgress, jobPostingInProgress } = {
        ...req.body
      };

      if (currentAppUser) {
        try {
          const newChromeStatus = {
            jobLinks,
            jobLinkCollectionInProgress,
            jobPostingInProgress
          };

          await dynamo.updateChromeStatus(
            newChromeStatus,
            currentAppUser.identifier
          );
          success = true;
          response = newChromeStatus;
        } catch (e) {
          log.error(e?.message);
          log.error(response);
        }
      }

      res.json({ success, response });
    } catch (e) {
      handleAPIError(res, e, response);
    }
  }
);

//TODO: delete should be done through graphql
/****************************
 * DELETE *
 ****************************/
router.delete('', async function (req, res) {
  try {
    const { currentAppUser } = req ?? {};
    let success = false;

    if (currentAppUser) {
      try {
        const { identifier, keyId, usagePlanId } = currentAppUser;
        await dynamo.deleteItem(identifier);
        await apiGateway.deleteApiKey(keyId, usagePlanId);
        success = true;
      } catch (e) {
        log.error(e?.message);
      }
    }

    res.json({ success });
  } catch (e) {
    handleAPIError(res, e, 'Could not delete a user');
  }
});

/****************************
 * QUESTION *
 ****************************/
router.post(
  '/question',
  body('questions')
    .isArray({ min: 1 })
    .withMessage('questions must be an array with at least one element')
    .custom(value => {
      return value.every(item => typeof item === 'string');
    })
    .withMessage('questions must only contain strings'),
  async function (req, res) {
    let success = false;
    let response = 'There was an error retrieving the answer/s';

    try {
      const {
        currentAppUser: { corpus, nlpModel, identifier, modelExpires },
        body: { questions = [] }
      } = req ?? {};
      const now = new Date();
      const expiresAt = new Date(modelExpires);

      if (
        corpus &&
        (nlpModel === undefined ||
          nlpModel === null ||
          expiresAt.getTime() < now.getTime())
      ) {
        const { response: responseTemp, nlpModel } =
          await processQuestionsArray(questions, corpus);
        response = responseTemp;
        const expires = new Date(now.getDate() + 7);

        await dynamo.updateNlpModel(nlpModel, expires, identifier);
      } else if (corpus) {
        const { response: responseTemp } = await processQuestionsArray(
          questions,
          corpus,
          nlpModel
        );
        response = responseTemp;
      }

      res.json({
        success,
        response
      });
    } catch (e) {
      handleAPIError(res, e.message);
    }
  }
);

module.exports.userRoutes = router;
