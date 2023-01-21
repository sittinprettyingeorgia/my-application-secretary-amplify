import { Home } from '@mui/icons-material';
import { ROUTES } from 'appConstants';
import { UserContext } from 'context/UserContext';
import { useState } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

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
        <Route path={ROUTES.LANDING} element={<Home />} />
        {/* <Route path={ROUTES.ERROR_PATH} element={<OHNOERROR />} /> */}
      </ReactRoutes>
    </UserContext.Provider>
  );
};

export default Routes;
