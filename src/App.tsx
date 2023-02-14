import React, { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';


  window.location.hostname === 'localhost' ||

    // [::1] is the IPv6 localhost address.

    window.location.hostname === '[::1]' ||

    // 127.0.0.0/8 are considered localhost for IPv4.

    window.location.hostname.match(

      /^127(?:.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/

    )

);

const signInURI = awsconfig.oauth.redirectSignIn.split(',')
const signOutURI = awsconfig.oauth.redirectSignOut.split(',')
const PROD = window.location.hostname === 'https://www.myapplicationsecretary.com';

if (isLocalhost) {
  awsconfig.oauth.redirectSignIn = signInURI[0]
  awsconfig.oauth.redirectSignOut = signOutURI[0]
} else if (PROD) {
  awsconfig.oauth.redirectSignIn = signInURI[1]
  awsconfig.oauth.redirectSignOut = signOutURI[1]
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
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Open Google</button>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
      <div>{user && user.getUsername()}</div>
    </div>
  );
}

export default App;