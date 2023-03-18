/* Amplify Params - DO NOT EDIT
	API_MYAPPLICATIONSECRETARYAMPLIFY_CORPUSTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_CORPUSTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIIDOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIKEYOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_RATELIMITTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME
	AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID
	ENV
	REGION
	STORAGE_USERFHCPUWHHYFFNDFM7DVQOI7745ADEV_ARN
	STORAGE_USERFHCPUWHHYFFNDFM7DVQOI7745ADEV_NAME
	STORAGE_USERFHCPUWHHYFFNDFM7DVQOI7745ADEV_STREAMARN
Amplify Params - DO NOT EDIT */ /*
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

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const express = require('express');
const bodyParser = require('body-parser');
const { enableCors, getUser, getCognitoUser } = require('./util/middleware');
const { userRoutes } = require('./routes/user');

// declare a new express app
const app = express();

/**********************
 * Add middleware *
 **********************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(enableCors).use(getCognitoUser).use(getUser);
app.use('/user', userRoutes);

app.listen(3000, function () {
  console.log('My Application Secretary started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
