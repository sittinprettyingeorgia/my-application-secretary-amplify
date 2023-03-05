const personalCorpus = {
    "name": "QuestionsAndAnswers",
    "locale": "en-US",
    "data": [
      {
        "intent": "question.education",
        "utterances": [
          "Highest Education Level, if a degree please list your degree type and major?",
          "Do you have a bachelor's degree?",
          "What is the highest education you have completed?",
          "Please choose the statement that best describes your education"
        ],
        "answers": [
          "Bachelor's degree of Computer Science",
          "yes"
        ]
      },
      {
        "intent": "question.java",
        "utterances": [
          "Do you have at least 2 years of java experience?",
          "How many years of professional java experience do you have?"
        ],
        "answers": [
          "2 years",
          "yes"
        ]
      },
      {
        "intent": "question.springboot",
        "utterances": [
          "Do you have at least 2 years of spring boot experience?",
          "How many years of professional spring boot experience do you have?"
        ],
        "answers": [
          "2",
          "yes"
        ]
      },
      {
        "intent": "question.streetAddress",
        "utterances": [
          "home address",
          "street address"
        ],
        "answers": [
          "34027 CA-41"
        ]
      },
      {
        "intent": "question.state",
        "utterances": [
          "state"
        ],
        "answers": [
          "CA",
          "California"
        ]
      },
      {
        "intent": "question.zipAddress",
        "utterances": [
          "zip/postal code"
        ],
        "answers": [
          "93614"
        ]
      },
      {
        "intent": "question.citizenship",
        "utterances": [
          "Are you authorized to work in the United States",
          "Are you legally eligible to work in the United States?",
          "Do you have the right to work in the US",
          "What is your citizenship",
          "Are you a US Citizen (naturalized or U.S. Born)",
          "Because this supports the Federal Government, are you a US Citizen"
        ],
        "answers": [
          "yes",
          "U.S Citizen"
        ]
      },
      {
        "intent": "question.contact",
        "utterances": [
          "sms text",
          "By applying to this position: I agree to",
          "Please indicate if you agree to be contacted by sms text",
          "Yes, I agree to be contacted by text messages",
          "I consent to the hiring team of this job contacting me via text message",
          "What is your preferred method of contact?"
        ],
        "answers": [
          "yes",
          "Yes, I agree to be contacted by text messages",
          "email"
        ]
      },
      {
        "intent": "question.fullStack",
        "utterances": [
          "Do you have professional experience as a Full Stack Developer or similar role?",
          "Do you have at least 2 years of experience as a full stack developer?",
          "Do you have experience on both the front-end and the back-end?"
        ],
        "answers": [
          "yes"
        ]
      },
      {
        "intent": "question.race",
        "utterances": [
          "race/ethnicity",
          "race or ethnicity",
          "Ethnic Background"
        ],
        "answers": [
          "Black or African American"
        ]
      },
      {
        "intent": "question.salary",
        "utterances": [
          "Salary requirements",
          "compensation",
          "Desired Pay",
          "Desired Annual Salary"
        ],
        "answers": [
          "120,000",
        ]
      },
      {
        "intent": "question.name",
        "utterances": [
          "Full Name",
          "Signature"
        ],
        "answers": [
          "Mitchell Blake"
        ]
      },
      {
        "intent": "question.city",
        "utterances": [
          "city"
        ],
        "answers": [
          "Coarsegold"
        ]
      },
      {
        "intent": "question.country",
        "utterances": [
          "country"
        ],
        "answers": [
          "United States",
          "U.S."
        ]
      },
      {
        "intent": "question.devops",
        "utterances": [
          "Knowledge & experience working with Devops tools?",
          "What experience do you have with Devops tools"
        ],
        "answers": [
          "yes",
          "I have worked with AWS CI/CD using CodeBuild and CodePipeline, I have also utilized tools like Splunk, Cloudwatch, Opensearch, and ElasticSearch for logging and debugging production services."
        ]
      },
      {
        "intent": "question.clearance",
        "utterances": [
          "Are you able to obtain and maintain a security clearance?"
        ],
        "answers": [
          "yes"
        ]
      },
      {
        "intent": "question.vaccine",
        "utterances": [
          "Are you vaccinated?"
        ],
        "answers": [
          "yes"
        ]
      },
      {
        "intent": "question.age",
        "utterances": [
          "Are you at least 18 years of age or older?"
        ],
        "answers": [
          "yes"
        ]
      },
      {
        "intent": "question.speakEnglish",
        "utterances": [
          "Do you speak Fluent English?"
        ],
        "answers": [
          "yes"
        ]
      }
    ]
}

module.exports.personalCorpus = personalCorpus;