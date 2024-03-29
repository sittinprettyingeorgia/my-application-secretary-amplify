import { GetParameterCommand, PutParameterCommand } from '@aws-sdk/client-ssm';

class ClientSSMUtil {
  client_ssm;

  constructor(client_ssm: any) {
    this.client_ssm = client_ssm;
  }

  async getSecretValue(Name?: string) {
    if (!Name) return;

    const command = new GetParameterCommand({
      Name,
      WithDecryption: true
    });
    const response = await this.client_ssm.send(command);
    return response.Parameter.Value;
  }

  async setSecretValue(Name?: string, Value?: string) {
    if (!Name || !Value) return;

    const command = new PutParameterCommand({
      Name,
      Value,
      Type: 'SecureString', //TODO: We have a regular String in parameter store
      Overwrite: true
    });
    const response = await this.client_ssm.send(command);
    return response.Version;
  }

  async getStripeSecret(): Promise<string> {
    return this.getSecretValue(process.env.STRIPE_SECRET_NAME);
  }
}

export default ClientSSMUtil;
