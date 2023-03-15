const { DynamoDBClient, ScanCommand, QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');

const redis = require('redis');

const getDBClients = () => {
    try {
        let dynamoClient;
        let redisClient;
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

        dynamoDB = new DynamoDBClient({ region: process.env.REGION });
        dynamoClient = DynamoDBDocument.from(
            dynamoDB, translateConfig
        );


        redisClient = redis.createClient({
            socket:{
                host: `${process.env.REDIS_ENDPOINT}`,
                port: `${process.env.REDIS_PORT}`,
            },
            password:'dev'
        });
        return {redisClient, dynamoClient};
    } catch (e) {
        console.log(e);
    }
};

class Data {
    dynamoClient;
    redisClient;
    HOUR = 60;
    DAY = 24;
    TOKEN_BUCKET_CAPACITY = 150;
    TOKEN_PER_MIN = this.TOKEN_BUCKET_CAPACITY/this.DAY/60; // tokens per minute
    tokens = this.TOKEN_BUCKET_CAPACITY;
    lastRefillTime;
    interval;

    constructor(dynamoClient, redisClient) {
        this.dynamoClient = dynamoClient;
        this.redisClient = redisClient;
        this.lastRefillTime = Date.now();
    }

    async query(action, accessToken){
        const authUser = await this.getCognitoUser(accessToken);
        let result;

        switch(action) {
            case 'getUser':
               result = await this.#getUser(authUser.Username);
               break; 
        }
        
        return result;
    }

    async getCognitoUser(AccessToken) {
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
        
            const authUser = await client.send(command);
            return authUser;
          } catch(e){
            console.log(e);
        }
    }

    async #getUser(identifier) {
        try{;
            if(!identifier){
                throw new Error('The user could not be found, ensure you have retrieved a cognito user');
            }

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

    async refillTokens(identifier) {
        let redisClient = this.redisClient;
    
        if(!redisClient.isOpen){
          await redisClient.connect();
        }

        const now = Date.now();
        const timeElapsed = ((now - this.lastRefillTime)/ 1000/ 60); //convert to minutes
        const tokensToAdd = Math.floor(timeElapsed * this.TOKEN_PER_MIN);
        const tokens = Math.min(this.tokens + tokensToAdd, this.TOKEN_BUCKET_CAPACITY);
        this.lastRefillTime = now;

        await redisClient.set(`${identifier}tokens`, Math.floor(tokens));
        await redisClient.set(`${identifier}lastRefillTime`, this.lastRefillTime);
    }

    async #setInterval(identifier, interval = 60000) { //every minute it replenishes
        this.interval = setInterval(async () => await this.refillTokens(identifier), interval);
    };

    async rateLimit(accessToken) {
        try {
          const authUser = await this.getCognitoUser(accessToken);
          const identifier = authUser.Username;
      
          if (!this.interval) {
            await this.#setInterval(identifier);
          }
      
          const redisClient = this.redisClient;
          if(!redisClient.isOpen){
            let connect = await redisClient.connect();
            console.log(connect);
          }

          const tokenCount = await redisClient.get(`${identifier}tokens`);

          if(tokenCount == null){
            //user has never accessed this and needs a bucket created.
            await this.refillTokens(identifier);
          } else {
            console.log('tokenCount');
            console.log(tokenCount);
            const count = parseInt(tokenCount, 10) || 0;

            if (count === 0) {
              return 429;
            }
          }
      
          await redisClient.decr(`${identifier}tokens`);
          this.tokens--;

          return 200;
        } catch (e) {
          console.log(e);
          return 500;
        }
    }
}


const {dynamoClient, redisClient} = getDBClients();
const data = new Data(dynamoClient, redisClient);

module.exports = { Data:data };