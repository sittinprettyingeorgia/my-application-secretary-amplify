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

const {CognitoIdentityProviderClient, AdminGetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');
const {SSMClient, GetParameterCommand} = require('@aws-sdk/client-ssm');
//const {Auth} = require('aws-amplify');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const env = process.env.NODE_ENV || 'dev';
const graphqlEndpoint = process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT;
const UserPoolId = process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID;
const mutations = require('./graphql/mutations.js');
const {getUser} = require('./graphql/queries.js');
const {handleResponse, CONSTANTS, processQuestionsArray, categorizeQuestions } = require('./util/index.js');
const {themes, testQuestions } = require('./constants/npl-themes');

const authMode = 'API_KEY';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
let OPTIONS = {};

const questionInputTest = 	[{
  "id": "286052",
  "type": "select",
  "question": "<br\/>Are you legally authorized to work in the United States",
  "required": "true",
  "options": [
    {
      "value": "1080238",
      "label": "Yes"
    },
    {
      "value": "1080239",
      "label": "No"
    }
  ]
},
{
  "id": "286048",
  "type": "select",
  "question": "How many years of Software Engineering experience do you have?",
  "required": "true",
  "options": [
    {
      "value": "1080225",
      "label": "Less than 1 year"
    },
    {
      "value": "1080226",
      "label": "1 to 2 years"
    },
    {
      "value": "1080227",
      "label": "2 to 4 years"
    },
    {
      "value": "1080228",
      "label": "4 to 6 years"
    },
    {
      "value": "1082524",
      "label": "I have no experience"
    },
    {
      "value": "1082525",
      "label": "6 to 8 years"
    },
    {
      "value": "1082526",
      "label": "8+ years"
    }
  ]
},
{
  "id": "286050",
  "type": "select",
  "question": "How many years of work experience do you have using Java?",
  "required": "true",
  "options": [
    {
      "value": "1080233",
      "label": "Less than 1 year"
    },
    {
      "value": "1080234",
      "label": "1 to 2 years"
    },
    {
      "value": "1080235",
      "label": "2 to 4 years"
    },
    {
      "value": "1082509",
      "label": "4 to 6 years"
    },
    {
      "value": "1082510",
      "label": "6 to 8 years"
    },
    {
      "value": "1082513",
      "label": "I have never used Java"
    },
    {
      "value": "1082545",
      "label": "8+"
    }
  ]
},
{
  "id": "353523",
  "type": "select",
  "question": "How many years of experience do you have using Spring Boot?",
  "required": "true",
  "options": [
    {
      "value": "1254935",
      "label": "Less than 1 year"
    },
    {
      "value": "1254936",
      "label": "1-3 years"
    },
    {
      "value": "1254937",
      "label": "4-6 years"
    },
    {
      "value": "1254938",
      "label": "More than 6 years"
    },
    {
      "value": "1604984",
      "label": "I have no experience"
    }
  ]
},
{
  "id": "286067",
  "type": "select",
  "question": "How many years of work experience do you have using React?",
  "required": "true",
  "options": [
    {
      "value": "1080284",
      "label": "I have never used React"
    },
    {
      "value": "1080285",
      "label": "1 to 2 years"
    },
    {
      "value": "1080286",
      "label": "2 to 4 years"
    },
    {
      "value": "1080287",
      "label": "4 to 6 years"
    },
    {
      "value": "1082511",
      "label": "Less than 1 year"
    },
    {
      "value": "1082512",
      "label": "9+ years"
    },
    {
      "value": "1082551",
      "label": "6 to 8 years"
    }
  ]
},
{
  "id": "286049",
  "type": "select",
  "question": "How many years of experience do you have using AWS?",
  "required": "true",
  "options": [
    {
      "value": "1080229",
      "label": "Less than 1 year"
    },
    {
      "value": "1080230",
      "label": "1 to 2 years"
    },
    {
      "value": "1080231",
      "label": "2 to 3 years"
    },
    {
      "value": "1080232",
      "label": "5 to 7 years"
    },
    {
      "value": "1082537",
      "label": "I have no experience"
    },
    {
      "value": "1082538",
      "label": "3 to 5 years"
    },
    {
      "value": "1082539",
      "label": "7+ years"
    }
  ]
},
{
  "id": "503918",
  "type": "text",
  "question": "How many years experience do you have with Git, Containerization, or Microservices Architectures",
  "required": "true"
},
{
  "id": "286051",
  "type": "select",
  "question": "Are you eligible for DOD security clearance?",
  "required": "true",
  "options": [
    {
      "value": "1080236",
      "label": "Yes"
    },
    {
      "value": "1080237",
      "label": "Yes - Currently hold a clearance"
    },
    {
      "value": "1083232",
      "label": "No"
    }
  ]
},
{
  "id": "286808",
  "type": "select",
  "question": "If required, will you be able to obtain a Department of Defense Security Clearance which includes but is not limited to US Citizenship, background investigation, etc.?",
  "required": "true",
  "options": [
    {
      "value": "1082329",
      "label": "Yes"
    },
    {
      "value": "1082330",
      "label": "No"
    }
  ]
},
{
  "id": "286053",
  "type": "select",
  "question": "Please confirm your total compensation expectations for this position.",
  "required": "true",
  "options": [
    {
      "value": "1080240",
      "label": "Below $50,000"
    },
    {
      "value": "1080241",
      "label": "$50,000 to $60,000"
    },
    {
      "value": "1080242",
      "label": "$60,000 to $70,000"
    },
    {
      "value": "1080243",
      "label": "$70,000 to $80,000"
    },
    {
      "value": "1080244",
      "label": "$110,000 to $120,000"
    },
    {
      "value": "1080245",
      "label": "$120,000 to $130,000"
    },
    {
      "value": "1080246",
      "label": "$130,000 to $140,000"
    },
    {
      "value": "1080247",
      "label": "$140,000 to $150,000"
    },
    {
      "value": "1080288",
      "label": "More than $200,000"
    },
    {
      "value": "1242890",
      "label": "$80,000 to $90,000"
    },
    {
      "value": "1242891",
      "label": "$90,000 to $100,000"
    },
    {
      "value": "1242892",
      "label": "$100,000 to $110,000"
    },
    {
      "value": "1242893",
      "label": "$150,000 to $160,000"
    },
    {
      "value": "1242894",
      "label": "$160,000 to $170,000"
    },
    {
      "value": "1242895",
      "label": "$170,000 to $180,000"
    },
    {
      "value": "1242896",
      "label": "$180,000 to $190,000"
    },
    {
      "value": "1242897",
      "label": "$190,000 to $200,000"
    }
  ]
},
{
  "id": "286810",
  "type": "select",
  "question": "Are you willing to undergo a pre-employment background check?",
  "required": "true",
  "options": [
    {
      "value": "1082333",
      "label": "Yes"
    },
    {
      "value": "1082334",
      "label": "No"
    }
  ]
}];
// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// retrieve currentAuthUser
app.use(async function(req, res, next) {
  try {
    //TODO: we should be retrieving username from aws-amplify sdk Auth object
    const Username = req.get('Username');
    let currentUser;
  
    const client = new CognitoIdentityProviderClient({region: process.env.REGION});
    const command = new AdminGetUserCommand({      
      UserPoolId,
      Username
    });
    
    currentUser = await client.send(command);
    req.Username = Username;
    req.currentUser = currentUser;
  } catch (e) {
    req.currentUser = undefined;
    console.log("auth Err");
    //TODO: if not a currentUser send to signup page
  }

  next()
});

// setup api calls
app.use(async(req, res, next) => {
  try{
    const client = new SSMClient({region: process.env.REGION});
    const command = new GetParameterCommand({
      Name: `${process.env.GRAPHQL_NAME}`,
      WithDecryption:true
    });

    const response = await client.send(command);

    OPTIONS = {
      method: CONSTANTS.POST,
      url: graphqlEndpoint,
      headers: {
        'x-api-key': response?.Parameter?.Value,
        'Content-Type': 'application/json'
      }
    };
  } catch(e) {
    console.log(e);
  }

  next();
});

// verify user is paid-customer and retrieve currentAppUser
app.use(async function(req, res, next) {
  //TODO: verify paid-customer
  const {Username, currentUser} = req ?? {};
  let currentAppUser;
  let currentAppUserErr;

  if(currentUser && (currentUser.UserStatus === 'CONFIRMED' || currentUser.UserStatus === 'ARCHIVED' || currentUser.UserStatus === 'EXTERNAL_PROVIDER')){
    const options =  {
      ...OPTIONS, 
      data: JSON.stringify({ query:getUser, authMode, variables: {identifier: Username} })
    };

    try {
      const result = await axios(options);
      currentAppUser = result?.data?.data?.getUser;
    } catch (e) {
      currentAppUserErr = handleResponse(e);
      console.log(currentAppUserErr);
    }

    if (currentAppUser?.jobLinks && currentAppUser.jobLinks.length > 0) {
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

app.get('/user/category', async(req, res) => {
  // Add your code here

  res.json({
    success: true,
    response: themes
  });
});

/****************************
* Example post method *
****************************/
app.post('/user', async function(req, res) {
  const {currentAppUser} = req ?? {};
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


