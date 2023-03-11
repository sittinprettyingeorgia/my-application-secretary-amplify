const { DynamoDBClient, ScanCommand, QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

class PrivateSingleton {
    client;

    constructor() {
        this.client = new DynamoDBClient({ region: process.env.REGION });
    }
}

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};
  
const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

class Data {
    static client;
    static authUser;

    constructor() {
        throw new Error('You must use Data.query()');
    }

    static async query(action, accessToken){
        if(!this.client){
            const instance = new PrivateSingleton().client;
            // Create the DynamoDB document client.
            const client = DynamoDBDocumentClient.from(instance, {
                marshallOptions,
                unmarshallOptions,
            });

            this.client = client;
        }

        if(!this.authUser){
            await this.#getCognitoUser(accessToken);
        }

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
            const identifier = this.authUser.Username;
            const params = {
                TableName: process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME,
                Key: {
                    'identifier': {S: identifier}
                }
            };
    
            const command = new GetItemCommand(params);
            const result = await this.client.send(command);
            const user = unmarshall(result.Item);
            
            return user;
        }catch(e){
            console.log(e);
            return 'There was an error retrieving the user';
        }
    }
}


module.exports = Data;