import { createContext, useContext, useEffect, useState } from 'react';
import { Button, Text } from '@aws-amplify/ui-react';
import { useUserContext } from '../../context/UserContext';

const Home = ({ children }: any): JSX.Element => {
  const { user, signOut } = useUserContext();

  useEffect(() => {
    document.title = `Home | My Application Secretary`;
  }, []);

  return (
    <main>
      <Text variation='primary'>Hello {user?.username}</Text>
      <Button variation='primary' onClick={signOut}>
        Sign out
      </Button>
    </main>
  );
};

export default Home;
