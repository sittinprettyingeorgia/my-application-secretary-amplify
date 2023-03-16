const {dynamo} = require('../database-factory');
const {Cache} = require('aws-amplify');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');

module.exports.getUser = async(req, res, next) => {
  const accessToken = req.get('access_token');

  if(accessToken){
    req.currentAppUser = await dynamo.query('getUser', accessToken);
  }

  next();
};

module.exports.enableCors = async(_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

class Interceptor {
  defaultRateLimit;
  currentUser;
  interval;

  constructor(){
    this.defaultRateLimit = {
      HOUR: 60,
      DAY: 24,
      TOKEN_BUCKET_CAPACITY: 150,
      TOKEN_PER_MIN: this.TOKEN_BUCKET_CAPACITY/this.DAY/60, // tokens per minute
      availableTokens: this.TOKEN_BUCKET_CAPACITY,
    }
    this.currentUser = null;
    this.interval = null;
  }

  async getCognitoUser(req, _res, next) {
    try {
      const {AccessToken} = req.get('access_token');
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
  
      const authUser = await client.send(command);
      req.currentUser = authUser;
    } catch(e){
      console.log(e);
    }

    next();
  }

  async refillTokens(identifier) {
    const now = Date.now();
    let { TOKEN_PER_MIN, TOKEN_BUCKET_CAPACITY, lastRefillTime, availableTokens } = Cache.getItem(`${identifier}`) ?? {};
    
    if(TOKEN_BUCKET_CAPACITY){
      const timeElapsed = ((now - lastRefillTime)/ 1000/ 60); //convert to minutes
      const tokensToAdd = Math.floor(timeElapsed * TOKEN_PER_MIN);
      let tokens = Math.min(availableTokens + tokensToAdd, TOKEN_BUCKET_CAPACITY);
      lastRefillTime = now;
  
      Cache.setItem(`${identifier}`, { TOKEN_PER_MIN, TOKEN_BUCKET_CAPACITY, availableTokens: Math.floor(tokens), lastRefillTime});
    }else {
      //TODO: should retrieve bucket info from dynamo
      // needs new default rate limit started
      Cache.setItem(`${identifier}`, { ...this.defaultRateLimit, lastRefillTime:now});
    }
  }

  // interval is applied to all users the same.
  async #setInterval(identifier, interval = 60000) { //every minute it replenishes
      this.interval = setInterval(async () => await this.refillTokens(identifier), interval);
  };

  async rateLimit(currentUser){
    try {
      //TODO: still need to memoize cognito user calls
      const identifier = currentUser.Username;
      await this.#setInterval(identifier);

      const {availableTokens, ...rest} = Cache.getItem(`${identifier}tokens`) ?? {};

      if(availableTokens == null){
        //user has never accessed this and needs a bucket created.
        await this.refillTokens(identifier);
      } else {
        const count = parseInt(availableTokens, 10) || 0;

        if (count <= 0) {
          return { statusCode:429 };
        }
        
        Cache.setItem(`${identifier}tokens`, {...rest, availableTokens});
      }

      return { statusCode: 200, availableTokens};
    } catch (e) {
      console.log(e);
      return { statusCode: 500};
    }
  }
}

const interceptor = new Interceptor();
module.exports.interceptor = interceptor;