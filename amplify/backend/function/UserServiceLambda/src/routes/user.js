const express = require('express');
const axios = require('axios');
const {handleResponse } = require('../util/index.js');
const {updateUser} = require('../graphql/mutations');
const router = express.Router();
const authMode = 'API_KEY';

/**********************
 * READ *
 **********************/
router.get('', async function(req, res) {
    // Add your code here
    const { currentAppUser, currentAppUserErr } = req ?? {};
    const {jobLinks, id, isActive, owner, ...rest} = currentAppUser ?? {};
    let success = currentAppUser ? true : false;
  
    res.json({
      success,
      response: success ? rest : currentAppUserErr
    });
});

// TODO: add rate limit based on cognito profile
router.get('/jobLink', async (req, res) => {
  // Add your code here
  const { currentAppUser, OPTIONS }= req ?? {};
  const { updatedAt, createdAt, owner, ...user } = currentAppUser ?? {};
  const jobLink = user?.jobLinks?.pop();
  let success = true;

  //TODO: update should be done with dynamodb
  // if(currentAppUser) {
  //   const options =  {
  //     ...OPTIONS,
  //     data: JSON.stringify({ query:updateUser, authMode, variables: { input: user } })
  //   }

  //   try {
  //     await axios(options);
  //     response = jobLink ? jobLink : 'There are no job application links available';
  //   }catch (e){
  //     success = false;
  //     response = 'There was an error retrieving the job application link.';
  //   }
  // }

  res.json({ success, response });
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