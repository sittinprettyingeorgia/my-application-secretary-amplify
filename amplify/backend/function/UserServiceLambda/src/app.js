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
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIIDOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIKEYOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME
	AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');
const {SSMClient, GetParameterCommand} = require('@aws-sdk/client-ssm');
const {Auth} = require('aws-amplify');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const env = process.env.NODE_ENV || 'dev';
const graphqlEndpoint = process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT;
const UserPoolId = process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID;
const mutations = require('./graphql/mutations.js');
const {handleResponse, CONSTANTS, processQuestionsArray, categorizeQuestions } = require('./util/index.js');
const {themes, testQuestions } = require('./constants/npl-themes');
const {getMyApplicationSecretaryUser, getCognitoUser, connectApi, enableCors} = require('./util/middleware');
const authMode = 'API_KEY';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(enableCors).use(getCognitoUser).use(connectApi).use(getMyApplicationSecretaryUser);

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

app.post('/user/answers', async (req, res) => {
  // Add your code here
  const {currentAppUser} = req ?? {};
  let result;

  if(currentAppUser){
    result = await processQuestionsArray(req.body.questions);
    console.log(result);
  }

  res.json({success: 'post call succeed!', response: result})
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


