const { handleError } = require('../util/response');
const { dynamo } = require('./dynamo');
const {
  APIGatewayClient,
  CreateApiKeyCommand,
  CreateUsagePlanKeyCommand,
  DeleteApiKeyCommand,
  DeleteUsagePlanKeyCommand
} = require('@aws-sdk/client-api-gateway');
const { v4: uuidv4 } = require('uuid');

const log = require('loglevel');
log.setLevel('info');

const getApiGateway = () => {
  try {
    const apigateway = new APIGatewayClient({
      region: process.env.REGION,
      httpOptions: {
        timeout: 5000
      }
    });

    return apigateway;
  } catch (ignore) {
    handleError(ignore, 'getApiGateway error');
  }
};

class ApiGatewayUtil {
  apiGateway;

  constructor(apiGateway) {
    this.apiGateway = apiGateway;
  }

  async deleteApiKey(apiKey) {
    try {
      const deleteApiKeyCommand = new DeleteApiKeyCommand({ apiKey });
      await this.apiGateway.send(deleteApiKeyCommand);
    } catch (e) {
      handleError(e, 'deleteApiKey error');
    }
  }

  async createApiKey(newUser) {
    try {
      const { subscriptionTier, identifier } = newUser ?? {};
      const uuid = uuidv4();

      // Create an API key based on the user's subscriptionTier
      const apiKey = await this.apiGateway.send(
        new CreateApiKeyCommand({
          name: `API key for ${identifier}`,
          enabled: true,
          generateDistinctId: true,
          value: uuid,
          tags: {
            subscriptionTier
          }
        })
      );
      const keyId = apiKey.id;

      const tier = {
        BASIC: process.env.BASIC,
        PREFERRED: process.env.PREFERRED,
        PREMIUM: process.env.PREMIUM
      };
      // Add the API key to the usage plan
      const usagePlanId = tier[subscriptionTier];
      await this.apiGateway.send(
        new CreateUsagePlanKeyCommand({
          usagePlanId,
          keyId,
          keyType: 'API_KEY'
        })
      );

      newUser.key = uuid;
      newUser.keyId = keyId;
      newUser.usagePlanId = usagePlanId;
      return newUser;
    } catch (e) {
      handleError(e, 'getDynamoClient error');
    }
  }
}

const client = getApiGateway();
const apiGateway = new ApiGatewayUtil(client);

module.exports.apiGateway = apiGateway;
