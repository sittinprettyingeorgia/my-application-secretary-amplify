import log from 'loglevel';
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  GetUserCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { handleAPIError } from './response';

export const pxToRem = (px: number) => {
  return String((0.0625 * 100 * px) / 100) + 'rem';
};

export const getCognitoUser = async (req: any) => {
  try {
    const AccessToken: string = req.get('access_token');
    let currentAuthUser: any;

    if (AccessToken) {
      const client = new CognitoIdentityProviderClient({
        region: process.env.REGION,
        httpOptions: {
          timeout: 3000
        }
      } as any);

      // Set up the GetUser command with the user access token
      const getUserCommand: any = new GetUserCommand({
        AccessToken
      });

      const response: any = await client.send(getUserCommand);

      // Call the GetUser command to get user information from AWS Cognito
      const command = new AdminGetUserCommand({
        UserPoolId: process.env.AUTH_MYAPPLICATIONSECRETARYAMPLIFY_USERPOOLID,
        Username: response.Username
      });

      currentAuthUser = await client.send(command as any);
    }

    return {
      Username: currentAuthUser?.Username as string,
      email: currentAuthUser?.UserAttributes.find(
        (attr: any) => attr.Name === 'email'
      )?.Value as string
    };
  } catch (e) {
    log.error(e);
  }
};
