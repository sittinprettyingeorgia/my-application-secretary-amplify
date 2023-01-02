import { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';


const ENV = {
  LOCAL: 'http://localhost:3000',
  DEV: 'https://dev.myapplicationsecretary.com',
  PROD: 'https://www.myapplicationsecretary.com'
};

let isProd:Boolean;
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
}

Amplify.configure(awsconfig);
function App() {
  const [user, setUser] = useState<any>(null);
  const [customState, setCustomState] = useState(null);
 
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

    return (
    <div className="App">
      {Boolean(isProd) && <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>}
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Sign In With Google</button>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
      <div>{user && user.getUsername()}</div>
    </div>
  );
}

export default App;