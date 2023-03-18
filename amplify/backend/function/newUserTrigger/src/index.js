/* Amplify Params - DO NOT EDIT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIIDOUTPUT
	API_MYAPPLICATIONSECRETARYAMPLIFY_GRAPHQLAPIKEYOUTPUT
	AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { GetItemCommand } = require('@aws-sdk/client-dynamodb');
const {
  APIGatewayClient,
  CreateApiKeyCommand,
  CreateUsagePlanKeyCommand
} = require('@aws-sdk/client-api-gateway');
const log = require('loglevel');
log.setLevel('info');

const options = {
  region: process.env.REGION,
  httpOptions: {
    timeout: 3000
  }
};
const apigateway = new APIGatewayClient(options);

exports.handler = async event => {
  log.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    const { Records } = event ?? {};

    Records.forEach(async record => {
      const { eventName, eventID, dynamodb } = record ?? {};

      if (record.eventName === 'INSERT') {
        const { NewImage } = record.dynamodb;

        // Get the user information from DynamoDB
        const username = NewImage.identifier.S;
        const params = {
          TableName:
            process.env.API_MYAPPLICATIONSECRETARYAMPLIFY_USERTABLE_NAME,
          Key: { identifier: { S: username } }
        };
        const user = await dynamodb.send(new GetItemCommand(params));

        // Create an API key based on the user's subscriptionTier
        const apiKey = await apigateway.send(
          new CreateApiKeyCommand({
            name: `API key for ${username}`,
            enabled: true,
            generateDistinctId: true,
            value: username,
            tags: {
              subscriptionTier: user.Item.subscriptionTier.S
            }
          })
        );

        const tier = {
          BASIC: process.env.BASIC,
          PREFERRED: process.env.PREFERRED,
          PREMIUM: process.env.PREMIUM
        };

        // Add the API key to the BASIC usage plan
        const usagePlanId = tier[user.subscriptionTier];
        await apigateway.send(
          new CreateUsagePlanKeyCommand({
            usagePlanId,
            keyId: apiKey.id,
            keyType: 'API_KEY'
          })
        );
      }

      log.log(eventID);
      log.log(eventName);
      log.log('DynamoDB Record: %j', dynamodb);
    });
  } catch (e) {
    log.error(e);
  }

  return Promise.resolve('Successfully processed DynamoDB record');
};
