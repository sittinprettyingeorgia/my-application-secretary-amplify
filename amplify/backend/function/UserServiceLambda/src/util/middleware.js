const axios = require('axios');
const {getUser} = require('../graphql/queries.js');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');
const {SSMClient, GetParameterCommand} = require('@aws-sdk/client-ssm');
const {handleResponse, CONSTANTS } = require('./index.js');
const authMode = 'API_KEY';

const questionInputTest =   [{
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

module.exports.enableCors = async(_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
};

module.exports.getCognitoUser = async(req, res, next) => {
  try {
    const accessToken = req.get('access_token');
    const client = new CognitoIdentityProviderClient({region: process.env.REGION});
    let user;

    // Set up the GetUser command with the user access token
    const getUserCommand = new GetUserCommand({
        AccessToken: accessToken
    });

    user = await client.send(getUserCommand);

    // Call the GetUser command to get user information from AWS Cognito
    const command = new AdminGetUserCommand({      
        UserPoolId: process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,
        Username: user.Username
    });

    req.currentUser = await client.send(command);
  } catch(e){
    console.log(e);
  }

    next()
};

module.exports.connectApi = async(req, res, next) => {
    try{
        const client = new SSMClient({region: process.env.REGION});
        const command = new GetParameterCommand({
          Name: `${process.env.GRAPHQL_NAME}`,
          WithDecryption:true
        });

        const response = await client.send(command);

        req.OPTIONS = {
            method: CONSTANTS.POST,
            url: process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT,
            headers: {
                'x-api-key': response?.Parameter?.Value,
                'Content-Type': 'application/json'
            }
        };
    } catch(e) {
      console.log(e);
    }

    next();
};
