import { ListUsersQuery } from '@/API';
import { UserContext } from '@/context/UserContext';
import { SignInHeader, SignInFooter, Footer } from '@/login';
import Navbar from '@/shared/Navbar';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, Auth } from 'aws-amplify';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from '@/theme';

interface Props {
  signOut: any;
  user: any;
}

const Landing = ({ signOut, user }: Props) => {
  const [appUser, setAppUser] = useState<any>();
  const [socket, setSocket] = useState<any>();

  const handleClick = async () => {
    try {
      const session = await Auth.currentSession();
      const url = `${process.env.NEXT_PUBLIC_REST_API}/jobLink`;

      const OPTIONS = {
        method: 'GET',
        url,
        headers: {
          'content-type': 'application/json',
          Authorization: session.getIdToken().getJwtToken(),
          access_token: session.getAccessToken().getJwtToken()
        }
      };

      //TODO: don't use axios just get the value from our next api.
      const response = await axios(OPTIONS);
      const jobLink = response?.data?.response;
      const socket = io('ws://localhost:3000');
      socket.emit('start-applying', { ...user, jobLink });
    } catch (e) {
      console.log(e);
      console.log('Failed to retrieve user job link');
    }
  };

  const retrieveCurrentAppUser = async (currentAuthUser: any) => {
    console.log(currentAuthUser);
    //TODO: use aws-amplify to retrieve Auth class inb rest api
    //console.log(await Auth.currentCredentials());
    const query = `
      query MyQuery {
        getUser(identifier: "${currentAuthUser.username}") {
          id
          isActive
          jobPostingInProgress
          jobLinks
          jobLinkCollectionInProgress
          identifier
          firstName
          email
          createdAt
          currentAppInfo
          lastName
          subscriptionTier
          subscriptionType
          updatedAt
          userJobPreferencesId
          Answers {
            items {
              answer
              questionID
              id
            }
          }
        }
      }
      `;

    let currentUser;
    try {
      //TODO: replace with call to our rest api
      currentUser = (await API.graphql({
        query,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })) as Promise<ListUsersQuery>;

      setAppUser(currentUser);
    } catch (e: any) {
      if (
        e.errors.find((t: any) => t.errorType === 'Unauthorized') &&
        currentAuthUser.username
      ) {
        // user is not authorized, prompt signup
      }
      //TODO: we should add error logging
    }
  };

  const socketInitializer = async () => {
    try {
      await axios('/api/socket');
      const initSocket = io();

      initSocket.on('connect', () => {
        console.log('connected');
      });
      setSocket(initSocket);
    } catch (e) {
      console.log('err socket');
    }
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    //TODO: should be done server side and provided as props
    retrieveCurrentAppUser(user);
  }, [user]);

  return (
    <main>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <UserContext.Provider value={{ user: appUser, signOut, socket }}>
            <Navbar auth={true} />
          </UserContext.Provider>
        </StyledThemeProvider>
      </ThemeProvider>
    </main>
  );
};

export default withAuthenticator(Landing, {
  components: {
    //Header: Header, this should be custom logo
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  },
  socialProviders: ['google'], //TODO: add facebook, apple, amazon, etc logins.
  hideSignUp: true // Hides the "Create Account" option
});
