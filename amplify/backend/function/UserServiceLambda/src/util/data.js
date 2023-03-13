const { DynamoDBClient, ScanCommand, QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');
const redis = require('redis');
class PrivateSingleton {
    dynamoClient;
    redisClient;

    constructor() {
        this.dynamoClient = new DynamoDBClient({ region: process.env.REGION });
        this.redisClient = redisClient = redis.createClient();
    }
}

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: true, // false, by default.
};
  
const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.

    // Here we specify that the 'listAttr' field is a List type
    // with elements of type 'S' (String)
    typeConverter: {
        fromDb: (attributeValue) =>
        attributeValue.L.map((value) => value.S),
    },
};
  
const translateConfig = { marshallOptions, unmarshallOptions };
const MILLISECONDS_IN_DAY = 86400000;

class Data {
    static dynamoClient;
    static redisClient;
    static authUser;
    static TOKEN_BUCKET_CAPACITY = 150;
    static TOKEN_FILL_RATE = this.TOKEN_BUCKET_CAPACITY/MILLISECONDS_IN_DAY;
    static TOKEN_FILL_INTERVAL = MILLISECONDS_IN_DAY/this.TOKEN_FILL_RATE;
    static tokens = TOKEN_BUCKET_CAPACITY;
    static lastRefillTime = Date.now();

    constructor() {
        throw new Error('You must use Data.query()');
    }

    static async query(action, accessToken){
        if(!this.dynamoClient){
            // Create the DynamoDB document client.
            this.dynamoClient = DynamoDBDocument.from(
                new PrivateSingleton().dynamoClient, translateConfig
            );
        }

        await this.#getCognitoUser(accessToken);
        let result;

        switch(action) {
            case 'getUser':
               result = await this.#getUser();
               break; 
        }
        
        return result;
    }

    static async rateLimit(_, res, next) {
        if(!this.redisClient){
            // Create the DynamoDB document client.
            this.redisClient = new PrivateSingleton().redisClient;
        }
        
        this.redisClient.get('tokens', (err, reply) => {
          if (err) {
            console.error('Error getting token count from Redis:', err);
            return res.status(500).send('Internal Server Error');
          }
      
          const tokenCount = parseInt(reply, 10) || 0;
      
          if (tokenCount === 0) {
            return res.status(429).send('Too many requests');
          }
      
          this.redisClient.decr('tokens', (err, reply) => {
            if (err) {
              console.error('Error decrementing token count in Redis:', err);
              return res.status(500).send('Internal Server Error');
            }
      
            next();
          });
        });
    }

    static async #getCognitoUser(AccessToken) {
        try {
            const client = new CognitoIdentityProviderClient({region: process.env.REGION});
            let user;
        
            // Set up the GetUser command with the user access token
            const getUserCommand = new GetUserCommand({
                AccessToken
            });
        
            user = await client.send(getUserCommand);
        
            // Call the GetUser command to get user information from AWS Cognito
            const command = new AdminGetUserCommand({      
                UserPoolId: process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,
                Username: user.Username
            });
        
            this.authUser = await client.send(command);
          } catch(e){
            console.log(e);
        }
    }

    static async #getUser() {
        try{
            const identifier = this?.authUser?.Username;
            const params = {
                TableName: process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME,
                Key: {
                    'identifier': {S: identifier}
                }
            };
    
            const result = await this.dynamoClient.send(new GetItemCommand(params));
            return unmarshall(result.Item);
        }catch(e){
            console.log(e);
            return 'There was an error retrieving the user';
        }
    }

    static async refillTokens() {
        const now = Date.now();
        const timeElapsed = now - lastRefillTime;
        const tokensToAdd = Math.floor(timeElapsed * TOKEN_FILL_RATE / TOKEN_FILL_INTERVAL);
        tokens = Math.min(tokens + tokensToAdd, TOKEN_BUCKET_CAPACITY);
        lastRefillTime = now;
      
        this.redisClient.set('tokens', tokens);
        this.redisClient.set('lastRefillTime', lastRefillTime);
    }
}


module.exports = Data;