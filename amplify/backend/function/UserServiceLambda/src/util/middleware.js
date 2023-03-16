const {dynamo} = require('../database-factory');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');
const {Cache} = require('aws-amplify');

const getUser = async(req, res, next) => {
  const {Username} = req ?? {};

  if(Username){
    let user = Cache.getItem(Username);

    if(!user) {
      user = await dynamo.query('getUser', Username);
    }

    req.currentAppUser = user;
    Cache.setItem(Username, user);
  }

  next();
};

const enableCors = async(_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

const getCognitoUser = async(req, res, next) => {
  try {
    const AccessToken = req.get('access_token');
    let currentAuthUser = Cache.getItem(AccessToken);

    if(!currentAuthUser){
      const client = new CognitoIdentityProviderClient({region: process.env.REGION});

      // Set up the GetUser command with the user access token
      const getUserCommand = new GetUserCommand({
          AccessToken
      });
  
      const {Username} = await client.send(getUserCommand) ?? {};
  
      // Call the GetUser command to get user information from AWS Cognito
      const command = new AdminGetUserCommand({      
          UserPoolId: process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,
          Username
      });
  
      currentAuthUser = await client.send(command);
    }

    req.Username = currentAuthUser.Username;
    Cache.setItem(AccessToken, currentAuthUser);
  } catch(e){
    console.log(e);
  }

  next();
};

module.exports = { getCognitoUser, getUser, enableCors };
