import { useCallback, useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import { getUpdatedAmplifyConfig } from './util';
import Box from '@mui/material/Box';

const isProd = getUpdatedAmplifyConfig(awsconfig);
//TODO: add user theme and context here.
function App() {
  const [user, setUser] = useState<any>(null);
  const [customState, setCustomState] = useState(null);
  const [email, setEmail] = useState<string>();
  const [phone_number, setPhone] = useState<string>();

  //TODO: flesh out the sign up and authentication for our graphql api
  const signUp = useCallback(async (username: string, password: string) => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phone_number, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'customOAuthState':
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        console.log(currentUser);
        setUser(currentUser);
      })
      .catch(() => console.log('Not signed in'));

    return unsubscribe;
  }, []);

  return (
    <Box>

      <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook })}>Open Facebook</button>
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Open Google</button>
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Amazon })}>Open Amazon</button>
      <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Apple })}>Open Apple</button>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
      <div>CurrentUser:{user && user.getUsername()}</div>
    </Box>
  );
}

export default App;
