const { handleError } = require('../util/response');
const {
  AppSyncClient,
  UpdateApiKeyCommand,
  ListApiKeysCommand
} = require('@aws-sdk/client-appsync');
const {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand
} = require('@aws-sdk/client-ssm');

const log = require('loglevel');
log.setLevel('error');

const getAppSyncAndSSM = () => {
  try {
    const appSyncClient = new AppSyncClient({
      region: process.env.REGION
    });
    const ssmClient = new SSMClient({
      region: process.env.REGION
    });

    return { appSyncClient, ssmClient };
  } catch (ignore) {
    handleError(ignore, 'getAppSync error');
  }
};

class AppSyncUtil {
  appSync;
  ssm;

  constructor(appSync, ssm) {
    this.appSync = appSync;
    this.ssm = ssm;

    //check every 30 days
    setInterval(() => this.updateAppSyncApiKey(), 2592000000);
  }

  async #getSecretValue(Name) {
    const command = new GetParameterCommand({
      Name,
      WithDecryption: true
    });
    const response = await this.ssm.send(command);
    return response.Parameter.Value;
  }

  async #setSecretValue(Name, Value) {
    const command = new PutParameterCommand({
      Name,
      Value,
      Type: 'SecureString',
      Overwrite: true
    });
    const response = await this.ssm.send(command);
    return response.Version;
  }

  async getAppSyncId() {
    return this.#getSecretValue(process.env.APPSYNC_NAME);
  }

  async updateAppSyncApiKey() {
    try {
      const apiId = await this.getAppSyncId();
      const { apiKey } = await this.appSync.send(
        new ListApiKeysCommand({ apiId })
      );
      const currentTimestamp = new Date().getTime() / 1000;

      if (currentTimestamp < apiKey?.expires) {
        console.log(`API key ${apiKey?.id} has not expired. Skipping update.`);
        return;
      }

      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      const command = new UpdateApiKeyCommand({
        apiId,
        id: apiKey,
        description: `AppSync api key for app id# ${apiId}`,
        expires: oneYearFromNow.getTime() / 1000 // Convert to seconds
      });

      const result = await this.appSync.send(command);
      await this.#setSecretValue(process.env.GRAPHQL_NAME, result.apiKey);
      log.info(`AppSync API key updated: ${result.apiKey.id}`);
    } catch (e) {
      log.error(e);
      throw new Error('Failed to update appSync api key');
    }
  }
}

const { appSyncClient, ssmClient } = getAppSyncAndSSM();
const appSync = new AppSyncUtil(appSyncClient, ssmClient);

module.exports.appSync = appSync;
