import { Text, useTheme } from '@aws-amplify/ui-react';
import { createContext, useContext, useState } from 'react';

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
  const { tokens } = useTheme();
  const [user, setUser] = useState<any>(authUser);

  return (
    <AppContext.Provider value={{ user, signOut }}>
      <main>
        <Text color={tokens.colors.primary}>Hello {user?.username}</Text>
        <button onClick={signOut}>Sign out</button>
      </main>
    </AppContext.Provider>
  );
};

export default Home;
