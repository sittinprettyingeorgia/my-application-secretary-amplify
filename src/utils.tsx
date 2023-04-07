import { Amplify, API } from 'aws-amplify';
import awsconfig from '@/aws-exports';

export const getUpdatedAmplifyConfig = (): boolean => {
  const ENV: { [key: string]: string } = {
    local: 'http://localhost:3000/auth/landing',
    dev: 'https://dev.myapplicationsecretary.com/auth/landing',
    prod: 'https://www.myapplicationsecretary.com/auth/landing'
  };

  const awsBranch = process.env.NEXT_PUBLIC_AWS_BRANCH || 'local';
  const isProd = awsBranch === 'prod';

  awsconfig.oauth.redirectSignIn = ENV[awsBranch];
  awsconfig.oauth.redirectSignOut = ENV[awsBranch];

  Amplify.configure({ ...awsconfig, ssr: true });
  try {
    API.configure(awsconfig);
  } catch (error) {
    console.error('Error configuring API:', error);
  }

  return isProd;
};

export const pxToRem = (px: number) => {
  return String((0.0625 * 100 * px) / 100) + 'rem';
};
