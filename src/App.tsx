import React, { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';

const PROD = "https://www.myapplicationsecretary.com";
const DEV = "https://dev.myapplicationsecretary.com";
const LOCAL = "http://localhost:3000";

if (process.env.REACT_APP_AWS_BRANCH === "main") {
  awsconfig.oauth.redirectSignIn = PROD;
  awsconfig.oauth.redirectSignOut = PROD;
} else if (process.env.REACT_APP_AWS_BRANCH === "dev"){
  awsconfig.oauth.redirectSignIn = DEV;
  awsconfig.oauth.redirectSignOut = DEV;
} else {
  awsconfig.oauth.redirectSignIn = LOCAL;
  awsconfig.oauth.redirectSignOut = LOCAL;
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
      <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook })}>Open Facebook</button>
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Open Google</button>
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Amazon })}>Open Amazon</button>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
      <div>{user && user.getUsername()}</div>
    </div>
  );
}

export default App;