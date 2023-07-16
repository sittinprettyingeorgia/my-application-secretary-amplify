const { NlpManager } = require('node-nlp');
const { s3, dynamo } = require('../util');
const zlib = require('zlib');
const log = require('loglevel');

log.setLevel('error');

// returns the closest match if no answers are found for a question.
// TODO: this does not utilize nlp. we should add that.
const closestMatch = (answers, options) => {
  let bestMatch = null;
  let maxMatches = -1;

  answers.forEach(answer => {
    const inputWords = answer.answer
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, ' ')
      .split(' ');

    options.forEach(o => {
      const labelWords = o
        .toLowerCase()
        .replace(/[^0-9a-z]/gi, ' ')
        .split(' ');
      let matches = 0;

      for (const element of inputWords) {
        if (labelWords.includes(element)) {
          matches++;
        }
      }

      // check for exact number matches
      const answerNum = Number(answer.answer.replace(/[^0-9]/g, ''));
      const labelNum = Number(o.replace(/[^0-9]/g, ''));
      if (!isNaN(answerNum) && !isNaN(labelNum) && answerNum === labelNum) {
        matches++;
      }

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = o;
      }
    });
  });

  return bestMatch;
};

const addDaysToCurrentTime = days => {
  const now = new Date();
  const msInDay = 24 * 60 * 60 * 1000;
  const futureDate = new Date(now.getTime() + days * msInDay);
  return futureDate;
};

const trainNewNlp = async (nlp, corpus, modelExpiresAt, identifier) => {
  await nlp.addCorpus(corpus);
  await nlp.train();
  const newModel = await nlp.export();
  const compressedModel = zlib.gzipSync(JSON.stringify(newModel));
  await s3.updateNlpModel(compressedModel, identifier);
  modelExpiresAt = addDaysToCurrentTime(7);
  await dynamo.updateModelExpiresAt(identifier, modelExpiresAt);
};

const retrieveNlpModel = async user => {
  let { corpus, modelExpiresAt, identifier } = user ?? {};

  // Disable debug log messages for Node-NLP
  console.log = () => {
    /*empty*/
  };

  //TODO: we want to cache the nlpManager and model so we can answer questions without retraining

  const nlp = new NlpManager({
    languages: ['en'],
    modelFileName: null, // Set modelFileName to null to prevent creation of model.nlp file
    autoSave: false,
    autoLoad: false
  });

  const expired =
    !modelExpiresAt || new Date().getTime() > new Date(modelExpiresAt);

  if (!expired) {
    try {
      const compressedModel = await s3.getObjectFromS3(identifier);
      const model = JSON.parse(zlib.gunzipSync(compressedModel));
      await nlp.import(model);
    } catch (e) {
      log.error(e);
      log.error('s3 Failed to retrieve nlp model');
      await trainNewNlp(nlp, corpus, modelExpiresAt, identifier);
    }
  } else {
    await trainNewNlp(nlp, corpus, modelExpiresAt, identifier);
  }

  return nlp;
};

// this is a the main function for our question route.
module.exports.processQuestionsArray = async (questionsArray, user) => {
  if (!user?.corpus || !questionsArray || questionsArray.length < 1) {
    throw new Error(
      'We can not process a users questions without the corpus and questions array'
    );
  }

  const nlp = await retrieveNlpModel(user);
  // Process each required question and obtain the appropriate answer
  const response = await Promise.all(
    questionsArray.map(async questionObj => {
      const { type, question, options = [] } = questionObj ?? {};
      const questionAnswer = await nlp.process(question);
      let answer = null;

      if (type === 'text') {
        answer = questionAnswer.answer;
      } else if (type === 'select') {
        answer = closestMatch(questionAnswer.answers, options);
      }

      return { question, answer };
    })
  );

  return response;
};
