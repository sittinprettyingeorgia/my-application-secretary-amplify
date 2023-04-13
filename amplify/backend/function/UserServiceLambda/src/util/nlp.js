const { dockStart } = require('@nlpjs/basic');
const { personalCorpus } = require('../corpus/personal');
const { granularCorpus } = require('../corpus/granularCorpus');
const { commonCorpus } = require('../corpus/common');

// Train the NLP model with the provided corpus
// TODO: reuse trained model by storing locally.
const dock = await dockStart({ use: ['Basic'] });
const nlp = dock.get('nlp');
await nlp.addCorpus(personalCorpus); //TODO: general corpus should be applied for all user models
await nlp.train();

class NlpProvider {
  constructor(nlp) {
    this.nlp = nlp;
  }
}

module.exports.nlp = nlp;
