import { useEffect, useState } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { ROUTES } from './appConstants';
import { UserContext } from './context/UserContext';
import Landing from './pages/home';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import { ListUsersQuery } from 'API';

export type AppProps = {
  authUser: any;
  signOut: any;
  children: any;
};

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
        authMode: 'API_KEY'
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
