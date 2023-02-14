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

const {CognitoIdentityProviderClient, AdminGetUserCommand} = require('@aws-sdk/client-cognito-identity-provider')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const env = process.env.NODE_ENV || 'development';
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

app.get('/user/:Username', async function(req, res) {
  // Add your code here
  const { Username } = req.params ?? {};
  const Authorization = req.get('Authorization');

  let statusCode = 200;
  let response;
  let body;
  try {
    const UserPoolId = env !== 'main' ? 'us-east-1_t1K4BKDuT': process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID;

    const client = new CognitoIdentityProviderClient({region: 'us-east-1'});
    const command = new AdminGetUserCommand({      
      UserPoolId,
      Username
    });
    const currentUser = await client.send(command);
  
    if(currentUser && (currentUser.UserStatus === 'CONFIRMED' || currentUser.UserStatus === 'ARCHIVED' || currentUser.UserStatus === 'EXTERNAL_PROVIDER')){
      const query = `
        query MyQuery {
          getUser(identifier: "${Username}") {
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
  
      const options =  {
        method: 'POST',
        headers: {
          Authorization
        },
        body: JSON.stringify({ query, authMode: 'AMAZON_COGNITO_USER_POOLS' })
      }
  
      try {
        const result = await fetch('https://7d3saxsuk5dpno7fnaar6vkgey.appsync-api.us-east-1.amazonaws.com/graphql', options);
        response = await result.json();
      }catch (e){
        statusCode = 400;
        response = {
          errors: [
            {
              message: e.message,
              stack: e.stack
            }
          ]
        };
      }
    }
  } catch(e) {
    statusCode = 400;
    response = {
      errors: [
        {
          message: e.message,
          stack: e.stack
        }
      ]
    };
  }

  res.json({
    statusCode,
    response
  });
});

app.get('/user/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/user', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/
app.post('/user', async function(req, res) {
  // Add your code here
  // TODO: handle create User request

  // const {jobLinks = [], jobPostingInProgress = false, lastName = '', jobLinkCollectionInProgress = false} = req.body ?? {};

  // const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

  // const currentUser = await cognitoIdentityServiceProvider.adminGetUser({      
  //   UserPoolId: AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,  
  //   Username: username
  // });

  // if(currentUser && (currentUser.UserStatus === 'CONFIRMED' || currentUser.UserStatus === 'ARCHIVED')){
  //   const query = `
  //     query MyQuery {
  //       getUser(identifier: "${username}") {
  //         id
  //         isActive
  //         jobPostingInProgress
  //         jobLinks
  //         jobLinkCollectionInProgress
  //         identifier
  //         firstName
  //         email
  //         createdAt
  //         currentAppInfo
  //         lastName
  //         subscriptionTier
  //         subscriptionType
  //         updatedAt
  //         userJobPreferencesId
  //         Answers {
  //           items {
  //             answer
  //             questionID
  //             id
  //           }
  //         }
  //       }
  //     }
  //   `;

  //   const existingUser = (await API.graphql({
  //       query,
  //       authMode: 'AMAZON_COGNITO_USER_POOLS'
  //     }))?.data?.getUser;

  //   if(existingUser) {
  //     const newQuery = `
  //     mutation MyMutation {
  //       updateUser(input: {jobLinks: ${jobLinks}, jobPostingInProgress: ${jobPostingInProgress}, lastName: ${lastName}, jobLinkCollectionInProgress: ${jobLinkCollectionInProgress}, firstName: ${firstName}, email: ${email}, currentAppInfo: ${currentAppInfo}, userJobPreferencesId: ${userJobPreferencesId}})
  //     }
  //     `;

  //     const result = (await API.graphql({
  //       query: newQuery,
  //       authMode: 'AMAZON_COGNITO_USER_POOLS'
  //     }));

  //   } else {

  //     //TODO: verify the user has paid and then add to group

  //     const params = {
  //       GroupName: 'paid-customer', //your confirmed user gets added to this group
  //       UserPoolId: AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,  
  //       Username: username
  //     };

  //     await cognitoIdentityServiceProvider.adminAddUserToGroup(params, function(err, data) {

  //       if (err) {
  //           callback(err) // uh oh, an error 
  //       }

  //       callback(null, event); // yay! success
  //     });


  //     // const createQuery = ``;
  //     //   //then create new user
  //     // (await API.graphql({
  //     //   query: createQuery,
  //     //   authMode: 'AMAZON_COGNITO_USER_POOLS'
  //     // }))?.data?.getUser;
  //   }
  // }

  res.json({success: 'post call succeed!', url: req.url})
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
