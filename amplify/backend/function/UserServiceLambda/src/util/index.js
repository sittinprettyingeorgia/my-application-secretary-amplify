const { DynamoDBClient, ScanCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');
const { NlpManager } = require('node-nlp');
const corpus = require('../corpus/personal.json');

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

module.exports.processQuestionsArray = (questionsArray) => {
  // Remove any objects from the array that do not have the "required" property with a value of true
  const requiredQuestions = questionsArray.filter(obj => obj.required === true);

  // Train the NLP model with the provided corpus
  const manager = new NlpManager({ languages: ['en'] });
  
  corpus.data.forEach(item => {
    manager.addDocument(item.locale, item.utterances, item.intent);
    item.answers.forEach(answer => {
      manager.addAnswer(item.locale, item.intent, answer);
    });
  });
  manager.train();

  // Process each required question and obtain the appropriate answer
  const answers = requiredQuestions.map(questionObj => {
    const type = questionObj.type;
    const question = questionObj.question;
    const options = questionObj.options || [];

    if (type === 'text') {
      return { question, answer: manager.process(question).answer };
    } else if (type === 'select') {
      const closestMatch = options.reduce((closest, option) => {
        const optionValue = option.value;
        const optionAnswer = manager.process(optionValue).answer;
        const questionAnswer = manager.process(question).answer;
        const distance = manager.evaluateAnswer(questionAnswer, optionAnswer);
        return distance > closest.distance ? closest : { distance, option };
      }, { distance: Infinity }).option;
      return { question, answer: closestMatch.value };
    } else {
      return { question, answer: null };
    }
  });

  return answers;
}