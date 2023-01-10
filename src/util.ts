import { Amplify } from "aws-amplify";

export const getUpdatedAmplifyConfig = (awsconfig:any):Boolean => {
    let isProd:Boolean;
    const ENV = {
        LOCAL: 'http://localhost:3000',
        DEV: 'https://dev.myapplicationsecretary.com',
        PROD: 'https://www.myapplicationsecretary.com'
    };

    if (process.env.REACT_APP_AWS_BRANCH === "main") {
        awsconfig.oauth.redirectSignIn = ENV.PROD;
        awsconfig.oauth.redirectSignOut = ENV.PROD;
        isProd = true;
    } else if (process.env.REACT_APP_AWS_BRANCH === "dev"){
        awsconfig.oauth.redirectSignIn = ENV.DEV;
        awsconfig.oauth.redirectSignOut = ENV.DEV;
        isProd = false;
    } else {
        awsconfig.oauth.redirectSignIn = ENV.LOCAL;
        awsconfig.oauth.redirectSignOut = ENV.LOCAL;
        isProd=false;
    }

    Amplify.configure(awsconfig);
    return isProd;
};