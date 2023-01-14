import { createContext, useContext, useState } from 'react';
import { Button, Text } from '@aws-amplify/ui-react';

type AppProps = {
  authUser: any;
  signOut: any;
};

type AppInfo = {
  user: any;
  signOut: any;
};

const appInfo: AppInfo = {
  user: undefined,
  signOut: undefined
};

//TODO: add user theme and context here.
export const AppContext = createContext(appInfo);

const Home = ({ authUser, signOut }: AppProps) => {
  const [user, setUser] = useState<any>(authUser);

  return (
    <AppContext.Provider value={{ user, signOut }}>
      <main>
        <Text variation='primary'>Hello {user?.username}</Text>
        <Button variation='primary' onClick={signOut}>
          Sign out
        </Button>
      </main>
    </AppContext.Provider>
  );
};

export default Home;
