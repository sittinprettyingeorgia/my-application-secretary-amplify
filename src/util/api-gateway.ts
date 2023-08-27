import { handleAPIError } from './response';
import {
  APIGatewayClient,
  CreateApiKeyCommand,
  CreateUsagePlanKeyCommand,
  DeleteApiKeyCommand
} from '@aws-sdk/client-api-gateway';
import { v4 as uuidv4 } from 'uuid';

import log from 'loglevel';
log.setLevel('info');

type NewUser = {
  subscriptionTier: string;
  identifier: string;
  apiKey?: string;
  apiKeyId?: string;
  usagePlanId?: string;
};

const getApiGateway = () => {
  try {
    const apigateway = new APIGatewayClient({
      region: process.env.REGION,
      httpOptions: {
        timeout: 5000
      }
    } as any);

    return apigateway;
  } catch (ignore) {
    handleAPIError(ignore, 'getApiGateway error');
  }
};

class ApiGatewayUtil {
  apiGateway;

  constructor(apiGateway: any) {
    this.apiGateway = apiGateway;
  }

  async deleteApiKey(apiKey: string) {
    try {
      const deleteApiKeyCommand = new DeleteApiKeyCommand({ apiKey });
      await this.apiGateway.send(deleteApiKeyCommand);
    } catch (e) {
      throw new Error('deleteApiKey error');
    }
  }

  async createApiKey(newUser: NewUser) {
    try {
      type Tier = 'BASIC' | 'PREFERRED' | 'PREMIUM';
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

      // Get the usage plan ID based on the user's subscriptionTier
      const tier = {
        BASIC: process.env.BASIC,
        PREFERRED: process.env.PREFERRED,
        PREMIUM: process.env.PREMIUM
      };

      // Add the API key to the usage plan
      const usagePlanId = tier[subscriptionTier as Tier];
      await this.apiGateway.send(
        new CreateUsagePlanKeyCommand({
          usagePlanId,
          keyId,
          keyType: 'API_KEY'
        })
      );

      newUser.apiKey = uuid;
      newUser.apiKeyId = keyId;
      newUser.usagePlanId = usagePlanId;
      return newUser;
    } catch (e: any) {
      log.error(e.message);
      throw new Error('getDynamoClient error');
    }
  }
}

const client = getApiGateway();
const apiGateway = new ApiGatewayUtil(client);
export default apiGateway;
