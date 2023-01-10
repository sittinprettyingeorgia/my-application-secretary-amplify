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
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBPREFERENCESTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBPREFERENCESTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_JOBTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_QUESTIONTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_QUESTIONTABLE_NAME
	API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_ARN
	API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME
	AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const Fuse = require('fuse.js')
const Amplify = require('aws-amplify')
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

app.get('/answers', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/answers/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

const TEST_QUALIFICATIONS = {
  'java': 1,
  'sql': 1,
  'html': 1,
  'css': 1,
  'react': 1,
  'javascript': 1,
  'typescript': 1,
  'spring boot': 1,
  'apache': 1,
  'MUI': 1,
  'AWS': 1,
  'front-end': 1,
  'backend': 1,
  'hibernate': 1,
  'spring-jpa': 1,
  'junit': 1,
};

//TODO: get all questions from graphql
//TODO: call from frontend
const getQAFuse = async() => {
  const query = `
    query MyQuery {
      listQuestions {
        nextToken
        startedAt
      }
    }
  `;

  const questions = await Amplify.API.graphql({
    query,
    authMode: 'AMAZON_COGNITO_USER_POOLS'
  });

  //Question Schema
  /*
    id
    firstName
    lastName
    email
    jobLinks
    jobLinkCollectionInProgress
    jobPostingInProgress
    currentAppInfo
    questions // a list of uuids for question objects
  */

  return new Fuse(questions, {
    includeScore: true,
    threshold: 0.6,
    distance: 200,
    minMatchCharLength: 10,
    // Search in `author` and in `tags` array
    keys: ['variations'],
  });
};

const getQuestionAndAnswers = (
    question = '',
    fuseResult  = {},
    questionsAndAnswers = [],
    answers,
) => {
  const {item, score} = fuseResult;
  let newQuestionAndAnswer;
  const newAnswers = new Set(item?.answers ?? []);
  if (newAnswers.size < 1) {
    // store new found question in QA store
    // we can also do a batch request by verifying a score of 1 and send all?
  }
  newAnswers.add('yes');

  if (answers) {
    newAnswers.forEach((answer) => answers.add(answer));
    newQuestionAndAnswer = {
      question: item?.question,
      answers,
      score,
    };
  } else {
    newQuestionAndAnswer = {question, answers: newAnswers, score};
  }


  const existingQuestion = questionsAndAnswers
      .find(
          (qa) =>qa?.question?.toLowerCase() ===
          newQuestionAndAnswer?.question?.toLowerCase(),
      );

  if (existingQuestion && (existingQuestion?.score ?? 1) <= (item?.score ?? 1)) {
    questionsAndAnswers.push(existingQuestion);
  } else if (Object.keys(newQuestionAndAnswer).length > 0) {
    questionsAndAnswers.push(newQuestionAndAnswer);
  }

  return [...questionsAndAnswers];
};

//TODO: contains test qualifications; needs to be updated with actual user data
const handleFuseAndQualificationSearch = (
    requiredRequestQuestions,
) => {
  let questionsAndAnswers = [];
  const fuse = getQAFuse();

  for ( const rq of requiredRequestQuestions) {
    try {
      let {question, type, options, text} = rq ?? {};
      question = question ?? text;

      if (question) {
        const results = fuse.search(question);
        let bestResult = results
            .sort((a, b) => ((a?.score ?? 1) - (b?.score ?? 1)))
            .shift();

        if (bestResult) {
          bestResult.item.question = question;
        } else {
          bestResult = {item: {question}, score: 1};
        }

        const qualifications = new Set();
        for (const [qualification, years] of Object.entries(TEST_QUALIFICATIONS)) {
          if (question.toLowerCase().search(qualification.toLowerCase()) >= 0) {
            qualifications.add(`${qualification} ${years} years`);
          }
        }

        questionsAndAnswers = getQuestionAndAnswers(
            question,
            bestResult,
            questionsAndAnswers,
            qualifications,
        );
      }
    } catch (e) {
      // log error for question
    }
  }

  return questionsAndAnswers;
};

const getQuestionsAndAnswers = (requestQuestions) => {
  const requiredRequestQuestions = Object.values(requestQuestions).filter(
      (q) => q?.required,
  );

  const questionsAndAnswers = handleFuseAndQualificationSearch(requiredRequestQuestions);

  return questionsAndAnswers.map((qa) => {
    const {question = '', score = 1, answers= new Set()} = qa;
    const newAnswers = [...answers];

    return {question, answers: newAnswers, score};
  });
};
//TODO: get api key for access/cognito pool
app.post('/answers', function(req, res) {
  // Add your code here
  const {body: requestQuestions} = req ?? {};
  const questionsAndAnswers = getQuestionsAndAnswers(requestQuestions);
  
  res.send(JSON.stringify(questionsAndAnswers));
  res.json({success: 'post call succeed!', body: requestQuestions, response: JSON.stringify(questionsAndAnswers)});
});

app.post('/answers/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/answers/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/answers', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/answers/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/answers', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/answers/*', function(req, res) {
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
