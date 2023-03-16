const express = require('express');
const router = express.Router();
const {dynamo} = require('../database-factory');
const {rateLimiter} = require('../util')

/**********************
 * READ *
 **********************/
router.get('', async function(req, res) {
  //const result = await getUser();
  const { currentAppUser } = req ?? {};
  const {jobLinks, id, isActive, owner, ...rest} = currentAppUser ?? {};
  let success = currentAppUser ? true : false;
  
  res.json({
    success,
    response: success ? rest : 'There was an error retrieving the user'
  });
});

const getJobLink = (req, res) => {
  const { currentAppUser }= req ?? {};
  const { updatedAt, createdAt, owner, ...user } = currentAppUser ?? {};
  const response = user?.jobLinks?.pop();

  //TODO: update user jobLinks list w/ dynamo
  res.status(200).json({ success:true, response });
};

router.get('/jobLink', async (req, res) => {
  const {currentAppUser} = req ?? {};
  const {statusCode} = await rateLimiter.rateLimit(currentAppUser.identifier);

  switch(statusCode){
    case 429:
      res.status(statusCode).json({
        success:false, response: 'You have reached your rate limit' 
      });
      break;
    case 500:
      res.status(statusCode).json({
        success:false, response: 'The resource is unavailable at this time' 
      });
      break;
    case 200:
      getJobLink(req, res);
      break;
  }
});

/****************************
* CREATE *
****************************/
router.post('', async function(req, res) {
    const {currentAppUser, OPTIONS} = req ?? {};
    const newAppUserInfo = {...currentAppUser, ...req.body};
    delete newAppUserInfo.updatedAt;
    delete newAppUserInfo.createdAt;
  
    let response;
    let success = true;
  
    if(currentAppUser){
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
  
    res.json({success, response});
});


/****************************
* UPDATE *
****************************/






/****************************
* DELETE *
****************************/




module.exports = router;