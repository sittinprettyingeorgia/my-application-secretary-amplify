const express = require('express');
const router = express.Router();
const { dynamo } = require('../database-factory/dynamo-client');
const { RateLimiter } = require('../util/rate-limiter');
const { handleError } = require('../util/response');

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
    handleError(e, 'Could not retrieve user');
    res.json({
      success: false,
      response: 'There was an error retrieving the user'
    });
  }
});

router.get('/jobLink', async (req, res) => {
  try {
    const { currentAppUser, Username } = req ?? {};
    const rateLimiter = new RateLimiter(dynamo);
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
    let response = 'Could not validate rate limit';
    handleError(e, response);
    res.status(200).json({ success: true, response });
  }
});

/****************************
 * CREATE *
 ****************************/
router.post('', async function (req, res) {
  try {
    const { currentAppUser, OPTIONS } = req ?? {};
    const newAppUserInfo = { ...currentAppUser, ...req.body };
    delete newAppUserInfo.updatedAt;
    delete newAppUserInfo.createdAt;

    let response;
    let success = true;

    if (currentAppUser) {
      //TODO: update user with dynamoDB
    } else {
      //TODO: verify the user has paid and then add to group
      // const params = {
      //   GroupName: 'paid-customer', //your confirmed user gets added to this group
      //   UserPoolId,
      //   Username: username
      // };
      // await cognitoIdentityServiceProvider.adminAddUserToGroup(params, function(err, data) {
      //   if (err) {
      //       callback(err) // uh oh, an error
      //   }
      //   callback(null, event); // yay! success
      // });
      // const createQuery = ``;
      //   //then create new user
      // (await API.graphql({
      //   query: createQuery,
      //   authMode: 'AMAZON_COGNITO_USER_POOLS'
      // }))?.data?.getUser;
    }

    res.json({ success, response });
  } catch (e) {
    let response = 'Could not create a user';
    handleError(e, response);
    res.json({ success: false, response });
  }
});

/****************************
 * UPDATE *
 ****************************/

/****************************
 * DELETE *
 ****************************/

module.exports.userRoutes = router;
