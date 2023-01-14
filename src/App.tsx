import { useCallback, useEffect, useState } from 'react';
import { Auth, Hub, API, Cache } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import { getUpdatedAmplifyConfig } from './util';
import Box from '@mui/material/Box';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';

const isProd = getUpdatedAmplifyConfig(awsconfig);
//TODO: add user theme and context here.
const App = () => {
  const [token, setToken] = useState();
  const [customState, setCustomState] = useState(null);
  const [email, setEmail] = useState<string>();
  const [phone_number, setPhone] = useState<string>();

  //TODO: flesh out the sign up and authentication for our graphql api
  //TODO: call graphapi and retrieve our authenticated user by username
  // if no user is found we signUp the user.
  const signUp = useCallback(async (username: string, password: string) => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        // attributes: {
        //   phone_number, // optional - E.164 number convention
        //   // other custom attributes
        // },
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

  const testAnswersApi = useCallback(async() => {
    try{
      // const result = await API.post('QAService','/answers',{
      //   body:{
      //     "0": {
      //       "id": "QA_5681376",
      //       "required": true,
      //       "question": "Proven experience as a Full Stack Developer or similar role",
      //       "type": "text",
      //       "limit": 127
      //     },
      //     "1": {
      //       "id": "QA_5681377",
      //       "required": true,
      //       "question": "Experience developing desktop and mobile applications",
      //       "type": "select",
      //       "options": [
      //         {
      //           "value": "1",
      //           "label": "Yes"
      //         },
      //         {
      //           "value": "0",
      //           "label": "No"
      //         }
      //       ]
      //     },
      //     "2": {
      //       "id": "QA_5681378",
      //       "required": true,
      //       "question": "Familiarity with common stacks",
      //       "type": "select",
      //       "options": [
      //         {
      //           "value": "1",
      //           "label": "Yes"
      //         },
      //         {
      //           "value": "0",
      //           "label": "No"
      //         }
      //       ]
      //     },
      //     "3": {
      //       "id": "QA_5681379",
      //       "required": true,
      //       "question": "Knowledge & experience working with Devops tools, (e.g: Jenkins, Chef, Puppet, Azure Devops)",
      //       "type": "text",
      //       "limit": 127
      //     },
      //     "4": {
      //       "id": "QA_5681380",
      //       "required": true,
      //       "question": "Knowledge of multiple front-end languages and libraries (e.g. HTML/ CSS, JavaScript, XML, jQuery)",
      //       "type": "text",
      //       "limit": 127
      //     },
      //     "5": {
      //       "id": "QA_5681381",
      //       "required": true,
      //       "question": "Knowledge of multiple back-end languages (e.g. C#, Java, Python), JavaScript frameworks (e.g. Angular, React, Node.js), API Management tools (e.g: Postman, Azure API Manager, AWS API Gateway)",
      //       "type": "text",
      //       "limit": 127
      //     },
      //     "6": {
      //       "id": "QA_5681382",
      //       "required": true,
      //       "question": "Familiarity with databases (e.g. PostgreSQL, MySQL, MongoDB), web servers (e.g. Apache, Nginx) and UI/UX design",
      //       "type": "text",
      //       "limit": 127
      //     },
      //     "7": {
      //       "id": "QA_5681383",
      //       "required": true,
      //       "question": "Degree in Computer Science, Statistics or relevant field",
      //       "type": "select",
      //       "options": [
      //         {
      //           "value": "1",
      //           "label": "Yes"
      //         },
      //         {
      //           "value": "0",
      //           "label": "No"
      //         }
      //       ]
      //     },
      //     "8": {
      //       "id": "texting_consent",
      //       "type": "information",
      //       "text": "I consent to the hiring team of this job contacting me via text message.",
      //       "fontsize": 8
      //     }
      //   }
      // });

    } catch (e) {
      // console.log('errr',e);
    }
  },[]);


  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
