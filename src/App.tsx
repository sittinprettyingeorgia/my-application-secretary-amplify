import { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import { getUpdatedAmplifyConfig } from './util';

const isProd = getUpdatedAmplifyConfig(awsconfig);

//TODO: add user theme and context here.

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
      //TODO: themeprovider here
    <div className="App">
      {Boolean(isProd) && <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>}
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Sign In With Google</button>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
      <div>{user && user.getUsername()}</div>
    </div>
  );
}

export default App;