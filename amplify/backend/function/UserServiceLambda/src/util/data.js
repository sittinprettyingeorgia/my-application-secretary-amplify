const { DynamoDBClient, ScanCommand, QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');

const redis = require('redis');

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
class PrivateSingleton {
    dynamoClient;
    redisClient;
    docClient;
    static MILLISECONDS_IN_DAY = 86400000;
    static TOKEN_BUCKET_CAPACITY = 150;
    static TOKENS = this.TOKEN_BUCKET_CAPACITY;
    static TOKEN_FILL_RATE = this.TOKEN_BUCKET_CAPACITY/this.MILLISECONDS_IN_DAY;
    static TOKEN_FILL_INTERVAL = this.MILLISECONDS_IN_DAY/this.TOKEN_FILL_RATE;
    tokens = this.TOKEN_BUCKET_CAPACITY;
    lastRefillTime = Date.now();

    constructor() {
        return (async () => {
            this.dynamoClient = new DynamoDBClient({ region: process.env.REGION });
            this.docClient = DynamoDBDocument.from(
                this.dynamoClient, translateConfig
            );
            this.redisClient = redis.createClient();
            await this.redisClient.connect();
            // other synchronous initialization code...
            return this;
        })();
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
    
            const result = await this.docClient.send(new GetItemCommand(params));
            return unmarshall(result.Item);
        }catch(e){
            console.log(e);
            return 'There was an error retrieving the user';
        }
    }

    async refillTokens(identifier) {
        const now = Date.now();
        const timeElapsed = now - this.lastRefillTime;
        const tokensToAdd = Math.floor(timeElapsed * this.TOKEN_FILL_RATE / this.TOKEN_FILL_INTERVAL);
        this.TOKENS = Math.min(this.TOKENS + tokensToAdd, this.TOKEN_BUCKET_CAPACITY);
        this.lastRefillTime = now;

        await this.redisClient.set(`${identifier}tokens`, this.TOKENS);
        await this.redisClient.set(`${identifier}lastRefillTime`, this.lastRefillTime);
    }

    setInterval(identifier) {
        this.interval = setInterval(this.refillTokens(identifier), TOKEN_FILL_INTERVAL);
    };
}

class Data {
    instance;

    constructor() {
        throw new Error('You must use Data.getInstance()');
    }

    static async getInstance(){
        if(!this.instance){
            // Create the DynamoDB document client.
            this.instance = new PrivateSingleton();
        }

        return this.instance;
    }
}

const rateLimit = async(req, res, next) => {
    try{
        const data = (await Data.getInstance());
        const redisClient = data.redisClient;
        const identifier = req.currentAppUser.identifier;

        if(data.interval) {
            clearInterval(data.interval);
        }
        
        data.setInterval(identifier);

        await redisClient.get(`${identifier}tokens`, async(err, reply) => {
            if (err) {
                console.error('Error getting token count from Redis:', err);
                return res.status(500).send('Internal Server Error');
            }
        
            const tokenCount = 0;//parseInt(reply, 10) || 0;
        
            if (tokenCount === 0) {
                return res.status(429).send('Too many requests');
            }
        
            await redisClient.decr(`${identifier}tokens`, (err, reply) => {
                if (err) {
                console.error('Error decrementing token count in Redis:', err);
                return res.status(500).send('Internal Server Error');
                }
        
                next();
            });
        });
    }catch (e) {
        console.log(e);
    }
};

const query = async(action, accessToken) => {
    const data = (await Data.getInstance());
    return data.query(action, accessToken);
}

module.exports = { query, rateLimit };