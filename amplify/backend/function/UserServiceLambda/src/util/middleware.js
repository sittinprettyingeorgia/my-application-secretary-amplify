const { handleError } = require('./response');
const { dynamo } = require('../database-factory/dynamo-client');
const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  GetUserCommand
} = require('@aws-sdk/client-cognito-identity-provider');

const getUser = async (req, res, next) => {
  try {
    const { Username } = req ?? {};
    let user;

    if (Username) {
      user = await dynamo.query('getUser', Username);
      req.currentAppUser = user;
    }
  } catch (e) {
    handleError(e, 'getUser error');
  }

  next();
};

const enableCors = async (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

const getCognitoUser = async (req, res, next) => {
  try {
    const AccessToken = req.get('access_token');
    let currentAuthUser;

    if (AccessToken) {
      const client = new CognitoIdentityProviderClient({
        region: process.env.REGION,
        httpOptions: {
          timeout: 3000
        }
      });

      // Set up the GetUser command with the user access token
      const getUserCommand = new GetUserCommand({
        AccessToken
      });

      const { Username } = (await client.send(getUserCommand)) ?? {};

      // Call the GetUser command to get user information from AWS Cognito
      const command = new AdminGetUserCommand({
        UserPoolId: process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,
        Username
      });

      currentAuthUser = await client.send(command);
    }

    req.Username = currentAuthUser?.Username;
  } catch (e) {
    handleError(e, 'getCognitoUser error');
  }

  next();
};

module.exports = { getCognitoUser, getUser, enableCors };
