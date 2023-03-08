const express = require('express');
const axios = require('axios');
const mutations = require('../graphql/mutations.js');
const {handleResponse } = require('../util/index.js');
const {getUser} = require('../graphql/queries');

const router = express.Router();
const authMode = 'API_KEY';

/**********************
 * READ *
 **********************/
router.get('', async function(req, res) {
    // Add your code here
    const {currentUser, OPTIONS} = req ?? {};
    let currentAppUser, currentAppUserErr;
    let success = true;
    
    try {
      if(currentUser && (currentUser.UserStatus === 'CONFIRMED' || currentUser.UserStatus === 'ARCHIVED' || currentUser.UserStatus === 'EXTERNAL_PROVIDER')){
          const options =  {
            ...OPTIONS, 
            data: JSON.stringify({ query:getUser, authMode, variables: {identifier: currentUser.Username} })
          };
      
          try {
              const result = await axios(options);
              currentAppUser = result?.data?.data?.getUser;
              
          } catch (e) {
              currentAppUserErr = handleResponse(e);
              success = false;
          }
      
          if (currentAppUser?.jobLinks && currentAppUser.jobLinks.length > 0) {
            currentAppUser.jobLinks = currentAppUser.jobLinks.filter(Boolean);
          }
      }
  
      currentAppUserErr = currentAppUserErr ? currentAppUserErr : 'This user does not exist. Please sign up at https://www.myapplicationsecretary.com';
    } catch(e) {
      success = false;
      console.log(e);
    }
  
    res.json({
      success,
      response: success ? currentAppUser : currentAppUserErr
    });
});


/****************************
* CREATE *
****************************/
router.post('', async function(req, res) {
    const {currentAppUser, OPTIONS} = req ?? {};
    const newAppUserInfo = {...currentAppUser, ...req.body};
    delete newAppUserInfo.updatedAt;
    delete newAppUserInfo.createdAt;
    delete newAppUserInfo.Answers;
  
    let response;
    let success = true;
  
    if(currentAppUser) {
      const options =  {
        ...OPTIONS,
        data: JSON.stringify({ query:mutations.updateUser, authMode, variables: {input: newAppUserInfo} })
      }
  
      try {
        const result = await axios(options);
        response = result.data;
      }catch (e){
        success = false;
        response = handleResponse(e);
      }
  
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