import { Amplify, API } from 'aws-amplify';
import awsconfig from '@/aws-exports';

export const getUpdatedAmplifyConfig = (): boolean => {
  let isProd: boolean;
  const ENV = {
    LOCAL: 'http://localhost:3000',
    DEV: 'https://dev.myapplicationsecretary.com',
    PROD: 'https://www.myapplicationsecretary.com'
  };
  console.log(process.env.REACT_APP_AWS_BRANCH);

  if (process.env.REACT_APP_AWS_BRANCH === 'prod') {
    awsconfig.oauth.redirectSignIn = ENV.PROD;
    awsconfig.oauth.redirectSignOut = ENV.PROD;
    isProd = true;
  } else if (process.env.REACT_APP_AWS_BRANCH === 'dev') {
    awsconfig.oauth.redirectSignIn = ENV.DEV;
    awsconfig.oauth.redirectSignOut = ENV.DEV;
    isProd = false;
  } else {
    awsconfig.oauth.redirectSignIn = ENV.LOCAL;
    awsconfig.oauth.redirectSignOut = ENV.LOCAL;
    isProd = false;
  }

  Amplify.configure({ ...awsconfig, ssr: true });
  API.configure(awsconfig);

  return isProd;
};

export const pxToRem = (px: number) => {
  return String((0.0625 * 100 * px) / 100) + 'rem';
};
