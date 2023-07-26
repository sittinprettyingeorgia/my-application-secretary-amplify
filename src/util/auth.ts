import { Auth, Amplify, API } from 'aws-amplify';
import awsconfig from '@/aws-exports';

export const isAuthenticated = async () => {
  try {
    return await Auth.currentUserPoolUser();
  } catch (error) {
    return false;
  }
};

const SIGN_IN: { [key: string]: string } = {
  local: 'http://localhost:3000',
  dev: 'https://dev.myapplicationsecretary.com',
  prod: 'https://www.myapplicationsecretary.com'
};

const SIGN_OUT: { [key: string]: string } = {
  local: 'http://localhost:3000',
  dev: 'https://dev.myapplicationsecretary.com',
  prod: 'https://www.myapplicationsecretary.com'
};

export const getUpdatedAmplifyConfig = () => {
  const awsBranch = process.env.NEXT_PUBLIC_AWS_BRANCH || 'local';
  awsconfig.oauth.redirectSignIn = SIGN_IN[awsBranch];
  awsconfig.oauth.redirectSignOut = SIGN_OUT[awsBranch];

  Amplify.configure({ ...awsconfig, ssr: true });
  API.configure(awsconfig);
};
