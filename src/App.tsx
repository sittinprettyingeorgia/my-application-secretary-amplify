import React, { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';

const signInURI = awsconfig.oauth.redirectSignIn.split(',')
const signOutURI = awsconfig.oauth.redirectSignOut.split(',')
const PROD = window.location.hostname === 'https://myapplicationsecretary.com';

// check if env is localhost or not
// if you're not developing on localhost, you will need to detect this is another way—the docs linked above give some examples. 
const isLocalhost = !!(window.location.hostname === "localhost");

// split redirect signin and signout strings into correct URIs
const [productionRedirectSignIn, devRedirectSignIn, localRedirectSignIn ] = awsconfig.oauth.redirectSignIn.split(",");
const [productionRedirectSignOut, devRedirectSignOut, localRedirectSignOut ] = awsconfig.oauth.redirectSignOut.split(",");

const getProdOrDevSignIn = () => {
  return !!(window.location.hostname === "dev") ? devRedirectSignIn : productionRedirectSignIn;
};

const getProdOrDevSignOut = () => {
  return !!(window.location.hostname === "dev") ? devRedirectSignOut : productionRedirectSignOut;
};

// use correct URI in the right env
const updatedAwsConfig = {...awsconfig,oauth: {...awsconfig.oauth,redirectSignIn: isLocalhost 
    ? localRedirectSignIn 
    : getProdOrDevSignIn,
redirectSignOut: isLocalhost 
    ? localRedirectSignOut 
    : getProdOrDevSignOut,
   }
};

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