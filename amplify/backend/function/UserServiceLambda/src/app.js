/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["GRAPHQL_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
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

const {CognitoIdentityProviderClient, AdminGetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');
const {SSMClient, GetParameterCommand} = require('@aws-sdk/client-ssm');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const env = process.env.NODE_ENV || 'dev';
const graphqlEndpoint = 'https://rjohesekyvhvphyjtowls7pi2a.appsync-api.us-east-1.amazonaws.com/graphql';
const UserPoolId = env !== 'prod' ? 'us-east-1_r0KOVwzLe': process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID;
const mutations = require('./graphql/mutations');
const {getError} = require('./util/handleError');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// verify user is valid authUser and retrieve currentAuthUser
app.use(async function(req, res, next) {
  try {
    const Authorization = req.get('Authorization');
    const Username = req.get('Username');
    let currentUser;
  
    const client = new CognitoIdentityProviderClient({region: 'us-east-1'});
    const command = new AdminGetUserCommand({      
      UserPoolId,
      Username
    });
    
    currentUser = await client.send(command);
  
    req.Authorization = Authorization;
    req.Username = Username;
    req.currentUser = currentUser;
  } catch (e) {
    req.currentUser = undefined;
    //TODO: if not a currentUser send to signup page
  }

  next()
});

// get api key for graphql
app.use(async(req, res, next) => {
  try{
    const client = new SSMClient({region: 'us-east-1'});
    const command = new GetParameterCommand({
      Name: '/amplify/d2hrfaun0zvn3p/dev/AMPLIFY_UserServiceLambda_GRAPHQL_API_KEY',
      WithDecryption:true
    });

    const response = await client.send(command);
    req.apiKey = response.Parameter.Value;
  } catch(e) {
    console.log(e);
  }

  next();
});

// verify user is paid-customer and retrieve currentAppUser
app.use(async function(req, res, next) {
  //TODO: verify paid-customer
  const {Authorization, Username, currentUser} = req ?? {};
  let currentAppUser;
  let currentAppUserErr;

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
      url: graphqlEndpoint,
      headers: {
        'x-api-key': req?.apiKey
      },
      data: JSON.stringify({ query, authMode:'API_KEY' })
    }

    try {
      const result = await axios(options);
      currentAppUser = result?.data?.data?.getUser;
    }catch (e){
      currentAppUserErr = getError(e);
      console.log(currentAppUserErr);
    }

    if(currentAppUser?.jobLinks && currentAppUser.jobLinks.length > 0){
      currentAppUser.jobLinks = currentAppUser.jobLinks.filter(Boolean);
    }
  }

  req.currentAppUser = currentAppUser;
  req.currentAppUserErr = currentAppUserErr ? currentAppUserErr : 'This user does not exist. Please sign up at https://www.myapplicationsecretary.com';

  next()
});

/**********************
 * Example get method *
 **********************/

app.get('/user', async function(req, res) {
  // Add your code here
  const {currentAppUser, currentAppUserErr } = req ?? {};
  let success = currentAppUser ? true : false;

  res.json({
    success,
    response: success ? currentAppUser : currentAppUserErr
  });
});

/****************************
* Example post method *
****************************/
app.post('/user', async function(req, res) {
  const {currentAppUser, currentAppUserErr, Authorization } = req ?? {};
  const newAppUserInfo = {...currentAppUser, ...req.body};
  delete newAppUserInfo.updatedAt;
  delete newAppUserInfo.createdAt;
  delete newAppUserInfo.Answers;

  console.log(newAppUserInfo);
  let response;
  let success = true;

  if(currentAppUser) {
    const options =  {
      method: 'POST',
      url: graphqlEndpoint,
      headers: {
        'x-api-key': req?.apiKey,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ query:mutations.updateUser, authMode, variables: {input: newAppUserInfo} })
    }

    try {
      const result = await axios(options);
      response = result.data;
    }catch (e){
      success = false;
      response = getError(e);
      console.log(response);
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

