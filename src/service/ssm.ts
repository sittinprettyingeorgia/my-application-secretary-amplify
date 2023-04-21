import {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand
} from '@aws-sdk/client-ssm';

const getSSM = () => {
  const ssmClient = new SSMClient({
    region: process.env.REGION
  });

  return ssmClient;
};

class SSMUtil {
  ssm;

  constructor(ssm: any) {
    this.ssm = ssm;
  }

  async #getSecretValue(Name?: string) {
    if (!Name) return;

    const command = new GetParameterCommand({
      Name,
      WithDecryption: true
    });
    const response = await this.ssm.send(command);
    return response.Parameter.Value;
  }

  async #setSecretValue(Name?: string, Value?: string) {
    if (!Name || !Value) return;

    const command = new PutParameterCommand({
      Name,
      Value,
      Type: 'SecureString', //TODO: We have a regular String in parameter store
      Overwrite: true
    });
    const response = await this.ssm.send(command);
    return response.Version;
  }

  async getStripeSecret(): Promise<string> {
    return this.#getSecretValue(process.env.STRIPE_SECRET_NAME);
  }
}

const ssmClient = getSSM();
const ssm = new SSMUtil(ssmClient);

export default ssm;
