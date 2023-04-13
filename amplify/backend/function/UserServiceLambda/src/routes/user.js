const express = require('express');
const router = express.Router();
const { dynamo } = require('../utils-factory/dynamo');
const { rateLimiter } = require('../util/rate-limiter');
const { handleAPIError } = require('../util/response');
const { processQuestionsArray } = require('../util/old-nlp');
const {
  isMapWithStringKeyAndNumberValue,
  isValidJobPreferences
} = require('../util/validator');
const { personalCorpus } = require('../corpus/personal');
const { commonCorpus } = require('../corpus/common');
const { apiGateway } = require('../utils-factory/api-gateway');
const { body, validationResult } = require('express-validator');
const log = require('loglevel');

log.setLevel('info');
const removeSensitive = user => {
  const { jobLinks, isActive, owner, keyId, usagePlanId, key, ...rest } =
    user ?? {};

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

//TODO: this method should be triggerred whenever a new cognito user is added. If a
// cognito user is added that means a new paying customer needs to be created.
// there should not be a post method exposed for /user
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
      success = await createUser(newAppUserInfo);
      response = removeSensitive(newAppUserInfo);
    }

    res.json({ success, response });
  } catch (e) {
    handleAPIError(res, e, 'Could not create a new user');
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
  async function (req, res) {
    const errors = validationResult(req);
    let response = 'Failed to update the user';
    let success = false;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
          log.error(e);
          log.error(response);
        }
      }

      res.json({ success, response });
    } catch (e) {
      handleAPIError(res, e, response);
    }
  }
);

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
        log.error(e);
      }
    }

    res.json({ success });
  } catch (e) {
    handleAPIError(res, e, 'Could not create a user');
  }
});

/****************************
 * QUESTION *
 ****************************/
router.post('/question', async function (req, res) {
  let success = false;
  let response = 'There was an error retrieving the answer/s';

  try {
    const {
      currentAppUser,
      body: { questions = [] }
    } = req ?? {};

    if (currentAppUser && questions.length > 0) {
      response = await processQuestionsArray(questions, personalCorpus);
      if (response && response.length > 0) {
        success = true;
      }
    }

    res.json({
      success,
      response
    });
  } catch (e) {
    handleAPIError(res, e, response);
  }
});

module.exports.userRoutes = router;
