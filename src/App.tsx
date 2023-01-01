import React, { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';

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