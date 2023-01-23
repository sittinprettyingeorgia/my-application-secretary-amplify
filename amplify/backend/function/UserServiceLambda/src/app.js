/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_MYAPPLICATIONSECRETARYAMPLIFY_ANSWERTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_ANSWERTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIIDOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIKEYOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBPREFERENCESTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBPREFERENCESTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_QUALIFICATIONTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_QUALIFICATIONTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_QUESTIONTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_QUESTIONTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME
	AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const { API, graphqlOperation} = require('aws-amplify')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/user', function(req, res) {
  // Add your code here
//TODO: return the current calling user using cognito user pools and relating username retrieved
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/user/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/
app.post('/user', async function(req, res) {
  // Add your code here
  const { username = '' } = someFunctionToverifyCognitouser();
  if(!username){
    //TODO: caller is not authorized
  }

  const {jobLinks, jobPostingInProgress, lastName, jobLinkCollectionInProgress} = req.body ?? {};

  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

  const currentUser = await cognitoIdentityServiceProvider.adminGetUser({      
    UserPoolId: AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,  
    Username: username
  });

  if(currentUser && (currentUser.UserStatus === 'CONFIRMED' || currentUser.UserStatus === 'ARCHIVED')){
    const query = `
      query MyQuery {
        getUser(identifier: "${username}") {
          id
          isActive
          jobPostingInProgress
          jobLinks
          jobLinkCollectionInProgress
          identifier
          firstName
          email
          createdAt
          currentAppInfo
          lastName
          subscriptionTier
          subscriptionType
          updatedAt
          userJobPreferencesId
          Answers {
            items {
              answer
              questionID
              id
            }
          }
        }
      }
    `;

    const existingUser = (await API.graphql({
        query,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }))?.data?.getUser;

    if(existingUser) {
      const newQuery = `
      mutation MyMutation {
        updateUser(input: {jobLinks: ${jobLinks}, jobPostingInProgress: ${jobPostingInProgress}, lastName: ${lastName}, jobLinkCollectionInProgress: ${jobLinkCollectionInProgress}, firstName: ${firstName}, email: ${email}, currentAppInfo: ${currentAppInfo}, userJobPreferencesId: ${userJobPreferencesId}})
      }
      `;

      const result = (await API.graphql({
        query: newQuery,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }));

    }else {

      //TODO: verify the user has paid and then add to group
      const params = {
        GroupName: 'paid-customer', //your confirmed user gets added to this group
        UserPoolId: AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,  
        Username: username
      };

      await cognitoIdentityServiceProvider.adminAddUserToGroup(params, function(err, data) {

        if (err) {
            callback(err) // uh oh, an error 
        }

        callback(null, event); // yay! success
      });


      // const createQuery = ``;
      //   //then create new user
      // (await API.graphql({
      //   query: createQuery,
      //   authMode: 'AMAZON_COGNITO_USER_POOLS'
      // }))?.data?.getUser;
    }
  }

  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/user/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/user', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/user/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/user', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/user/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
