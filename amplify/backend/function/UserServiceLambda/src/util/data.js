const { DynamoDBClient, ScanCommand, QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const {CognitoIdentityProviderClient, AdminGetUserCommand, GetUserCommand} = require('@aws-sdk/client-cognito-identity-provider');

class PrivateSingleton {
    client;

    constructor() {
        this.client = new DynamoDBClient({ region: process.env.REGION });
    }
}

class Data {
    static client;
    static authUser;

    constructor() {
        throw new Error('You must use Data.query()');
    }

    static async query(action, accessToken){
        if(!this.client){
            this.client = new PrivateSingleton().client;
        }

        if(!this.authUser){
            await this.#getCognitoUser(accessToken);
        }

        switch(action) {
            case 'getUser':
               await this.#getUser();
               break; 
        }
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
            console.log(identifier);
            const params = {
                TableName: 'User-fhcpuwhhyffndfm7dvqoi7745a-dev',
                Key: {
                    'identifier': {S: identifier}
                }
            }
    
            const command = new GetItemCommand(params);
            const result = await this.client.send(command);

            console.log(result);
            return result.Item;
        }catch(e){
            console.log(e);
            return 'There was an error retrieving the user';
        }
    }
}


module.exports = Data;