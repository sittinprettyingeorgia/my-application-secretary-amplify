import { useState } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { ROUTES } from './constants';
import { UserContext } from './context/UserContext';
import HomeRoot from './pages/home';

export type AppProps = {
  authUser: any;
  signOut: any;
  children: any;
};

const Routes = ({ authUser, signOut, children }: AppProps): JSX.Element => {
  const [user, _setUser] = useState<any>(authUser);

  return (
    <UserContext.Provider value={{ user, signOut }}>
      {children}
      <ReactRoutes>
        <Route path={ROUTES.HOME} element={<HomeRoot />} />
        {/* <Route path={ROUTES.ERROR_PATH} element={<OHNOERROR />} /> */}
      </ReactRoutes>
    </UserContext.Provider>
  );
};

export default Routes;
