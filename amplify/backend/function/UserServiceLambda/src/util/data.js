const { DynamoDBClient, ScanCommand, QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');

class PrivateSingleton {
    client;

    constructor() {
        this.client = new DynamoDBClient({ region: process.env.REGION });
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

class Data {
    static client;
    static authUser;

    constructor() {
        throw new Error('You must use Data.query()');
    }

    static async query(action, accessToken){
        if(!this.client){
            // Create the DynamoDB document client.
            const dynamo = new PrivateSingleton().client;
            this.client = DynamoDBDocument.from(dynamo, translateConfig);
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
    
            const result = await this.client.send(new GetItemCommand(params));
            return unmarshall(result.Item);
        }catch(e){
            console.log(e);
            return 'There was an error retrieving the user';
        }
    }
}


module.exports = Data;