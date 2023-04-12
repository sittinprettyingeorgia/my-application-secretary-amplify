const commonCorpus = {
  name: 'common',
  locale: 'en-US',
  data: [
    {
      intent: 'question.YesLeaning',
      utterances: ['Are you at least 18 years of age or older?'],
      answers: ['yes', 'agree']
    },
    {
      intent: 'question.expLeaning',
      utterances: [
        'How many years of experience do you have as a professional'
      ],
      answers: []
    },
    {
      intent: 'question.fullTime',
      utterances: [
        'Are you able to work full-time, part-time, or both?',
        'Are you able to work full-time?'
      ],
      answers: []
    },
    {
      intent: 'question.partTime',
      utterances: [
        'Are you able to work full-time, part-time, or both?',
        'Are you able to work part-time?'
      ],
      answers: []
    },
    {
      intent: 'question.citizenship',
      utterances: ['What is your citizenship'],
      answers: []
    },
    {
      intent: 'question.city',
      utterances: ['city'],
      answers: []
    },
    {
      intent: 'question.country',
      utterances: ['country'],
      answers: []
    },
    {
      intent: 'question.contact',
      utterances: [
        'What is your preferred method of contact?',
        'What is your preferred method of contact for job-related communication?'
      ],
      answers: []
    },
    {
      intent: 'question.date',
      utterances: ['Date'],
      answers: []
    },
    {
      intent: 'question.education',
      utterances: [
        'Highest Education Level, if a degree please list your degree type and major?',
        'What is the highest education you have completed?',
        'Please choose the statement that best describes your education',
        'High school\nHighest level of education completed',
        'College\nHighest level of education completed',
        'What is your highest level of education completed?'
      ],
      answers: []
    },
    {
      intent: 'question.english',
      utterances: [
        'Do you speak Fluent English?',
        'Are you fluent in English, both written and spoken?'
      ],
      answers: []
    },
    {
      intent: 'question.graduateYear',
      utterances: ['Year graduated', 'what year did you graduate?'],
      answers: []
    },
    {
      intent: 'question.name',
      utterances: ['Full Name', 'Signature', 'What is your full legal name'],
      answers: []
    },
    {
      intent: 'question.earliestAvailable',
      utterances: [
        'Earliest available',
        'If you’re currently working, how much notice do you need to give to your employer?',
        'Timeframe to start new position',
        'What is the earliest you can start a new position?',
        'Are you available to start work immediately or do you need to provide notice to your current employer?'
      ],
      answers: []
    },
    {
      intent: 'question.optIn',
      utterances: [
        'Would you like to opt-in to receive email notifications about new jobs'
      ],
      answers: ['no']
    },
    {
      intent: 'question.race',
      utterances: [
        'race/ethnicity',
        'race or ethnicity',
        'Ethnic Background',
        'Ethnicity'
      ],
      answers: []
    },
    {
      intent: 'question.referral',
      utterances: [
        'Were you referred by anyone?',
        'Please enter the name of the person who referred you.'
      ],
      answers: ['no']
    },
    {
      intent: 'question.reference',
      utterances: [
        'Can you provide references from previous employers or colleagues?'
      ],
      answers: ['yes']
    },
    {
      intent: 'question.terminated',
      utterances: [
        'Have you ever been terminated or asked to resign from a job?'
      ],
      answers: ['no']
    },
    {
      intent: 'question.salary',
      utterances: [
        'Salary requirements',
        'compensation requirements',
        'Desired Pay',
        'Desired Annual Salary',
        'What are your salary expectations for this job?'
      ],
      answers: []
    },
    {
      intent: 'question.school',
      utterances: ['School name'],
      answers: []
    },
    {
      intent: 'question.state',
      utterances: ['State'],
      answers: []
    },
    {
      intent: 'question.certificate',
      utterances: [
        'Do you have any professional certifications or licenses related to the job?'
      ],
      answers: []
    },
    {
      intent: 'question.streetAddress',
      utterances: [
        'home address',
        'street address',
        'address',
        'What is your current address'
      ],
      answers: []
    },
    {
      intent: 'question.vaccine',
      utterances: ['Are you vaccinated?'],
      answers: []
    },
    {
      intent: 'question.veteranStatus',
      utterances: ['Veteran status'],
      answers: []
    },
    {
      intent: 'question.zipAddress',
      utterances: ['zip/postal code', 'Zip/Postal'],
      answers: []
    },
    {
      intent: 'question.commute',
      utterances: [
        'Will you be able to reliably commute or relocate to some location for this job?',
        'Are you willing to relocate for the job, if necessary?'
      ],
      answers: []
    }
  ]
};

commonCorpus.data.sort((a, b) => {
  const intentA = a.intent.toLowerCase();
  const intentB = b.intent.toLowerCase();
  if (intentA < intentB) {
    return -1;
  }
  if (intentA > intentB) {
    return 1;
  }
  return 0;
});

module.exports.commonCorpus = commonCorpus;
