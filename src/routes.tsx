import React, { useEffect, useState } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { ROUTES } from './appConstants';
import { UserContext } from './context/UserContext';
import Landing from './pages/home';
import { API, Auth } from 'aws-amplify';
import { ListUsersQuery } from './API';

export type AppProps = {
  authUser: any;
  signOut: any;
  children: any;
};

async function signUp() {
  try {
    const { user } = await Auth.signUp({
      username: 'admin@myapplicationsecretary.com',
      password: 'Password1007$',
      attributes: {},
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true
      }
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }
}

const Routes = ({ authUser, signOut, children }: AppProps): JSX.Element => {
  const [user, setUser] = useState<any>(authUser);

  const retrieveCurrentAppUser = async (authUser: any) => {
    const query = `
    query MyQuery {
      getUser(identifier: "${authUser.username}") {
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

    console.log(authUser);
    let currentUser;
    try {
      currentUser = (await API.graphql({
        query,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })) as Promise<ListUsersQuery>;

      console.log(currentUser);
      setUser(currentUser);
    } catch (e: any) {
      console.log(e);
      if (
        e.errors.find((t: any) => t.errorType === 'Unauthorized') &&
        authUser.username
      ) {
        // user is not authorized, prompt signup
      }
      //TODO: we should add error logging
    }
  };

  useEffect(() => {
    retrieveCurrentAppUser(authUser);
  }, [authUser]);

  return (
    <UserContext.Provider value={{ user, signOut }}>
      {children}
      <ReactRoutes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        {/* <Route path={ROUTES.ERROR_PATH} element={<OHNOERROR />} /> */}
      </ReactRoutes>
    </UserContext.Provider>
  );
};

export default Routes;
