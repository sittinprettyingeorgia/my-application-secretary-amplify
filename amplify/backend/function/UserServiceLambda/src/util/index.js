const { DynamoDBClient, ScanCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');
const { NlpManager } = require('node-nlp');
const {themes, keywordMap} = require('../npl/npl-themes')
const { dockStart } = require('@nlpjs/basic');
const {personalCorpus} = require('../corpus/personal');

// The Theme which is returned will be used as the intent of the question ex
// question.git
// this is a helper function for categorizeQuestions
const extractThemeFromQuestion = async(question, nlp) => {
  const response = await nlp.process('en', question);
  const { answer } = response;

  for (const [keyword, theme] of keywordMap) {
    const distance = await nlp.process('en', keyword).score(answer);
    if (distance >= 0.7) {
      return `question.${theme}`;
    }
  }

  return null;
};

const closestMatch = (answers, options) => {
  let bestMatch = null;
  let maxMatches = -1;

  answers.forEach(answer => {
    const inputWords = answer.answer.toLowerCase().replace(/[^0-9a-z]/gi, ' ').split(' ');

    options.forEach(option => {
      const labelWords = option.label.toLowerCase().replace(/[^0-9a-z]/gi, ' ').split(' ');
      let matches = 0;

      for (let i = 0; i < inputWords.length; i++) {
        if (labelWords.includes(inputWords[i])) {
          matches++;
        }
      }

      // check for exact number matches
      const answerNum = Number(answer.answer.replace(/[^0-9]/g, ''));
      const labelNum = Number(option.label.replace(/[^0-9]/g, ''));
      if (!isNaN(answerNum) && !isNaN(labelNum) && answerNum === labelNum) {
        matches++;
      }

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = option.label;
      }
    });
  });

  return bestMatch;
}

module.exports.ddbClient = new DynamoDBClient({ region: 'us-east-1' });

module.exports.handleResponse = (e) => {
    let message = '';
    let err;
  
    if (e.response) {
      message =
        'The request was made and the server responded with a status code that falls out of the range of 2xx';
      err = { message, status: e?.response?.status, data: e?.response?.data};
    } else if (e.request) {
      message =
        'The request was made but no response was received `e.request` is an instance of XMLHttpRequest' +
        ' in the browser and an instance of http.ClientRequest in node.js';
      err = { message, error: e.request};
    } else {
      message =
        'Something happened in setting up the request that triggered an error';
      err = { message };
    }
  
    return err;
};

module.exports.CONSTANTS = {
    POST: 'POST',
    X_API_KEY: 'x-api-key',
    API_KEY_CONST: 'API_KEY',
};

// process incoming questions for job application
// return object {question:string, answer:string | null}
module.exports.processQuestionsArray = async(questionsArray) => {
  // Remove any objects from the array that do not have the "required" property with a value of true
  const requiredQuestions = questionsArray.filter(obj => obj.required === "true");

  // Train the NLP model with the provided corpus
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  await nlp.addCorpus(personalCorpus);
  await nlp.train();

  // Process each required question and obtain the appropriate answer
  const result = await Promise.all(requiredQuestions.map(async(questionObj) => {
    const {type, question, options = []} = questionObj ?? {};
    const questionAnswer = await nlp.process(question);
    let answer = null;

    if (type === 'text') {
      answer = questionAnswer.answer;
    } else if (type === 'select') {
      answer = closestMatch(questionAnswer.answers, options);
    }

    return { question, answer};
  }));

  return result;
}

// this should categorize questions into the corpus object structure
// by combining similiar questions into the same theme
// this should be used when adding new questions to a corpus
module.exports.categorizeQuestions = async(questions) => {
  const intents = {};

  const nlpManager = new NlpManager({ languages: ['en'], nlu: { useNoneFeature: false } });

  for (const question of questions) {
    const theme = extractThemeFromQuestion(question.question);

    let intentName = `question.${theme}`;
    if (intents[intentName]) {
      intents[intentName].utterances.push(question.question);
    } else {
      intents[intentName] = {
        utterances: [question.question],
        answer: []
      };
    }

    if (question.type === 'select') {
      const options = question.options.map((option) => option.label);
      for (const option of options) {
        nlpManager.addDocument('en', option, intentName);
      }
    } else if (question.type === 'text') {
      nlpManager.addDocument('en', question.question, intentName);
    }
  }

  await nlpManager.train();

  for (const question of questions) {
    const theme = extractThemeFromQuestion(question.question);
    const intentName = `question.${theme}`;

    if (question.type === 'select') {
      const answer = question.options.map((option) => option.label);
      intents[intentName].answer.push(answer);
    } else if (question.type === 'text') {
      intents[intentName].answer.push([]);
    }
  }

  return intents;
}

module.exports.mergeQualifications = (qualifications, corpusData) => {
  for(const [key,val] of Object.entries(qualifications)){
    // TODO: map qualifications to corpus data
  }
};