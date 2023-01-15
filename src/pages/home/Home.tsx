import { Button, Text, useTheme } from '@aws-amplify/ui-react';
import { useUserContext } from 'context/UserContext';
import useTitle from 'hooks/useTitle';
import NavBar from 'shared/NavBar';

const Home = ({ children }: any): JSX.Element => {
  const { user, signOut } = useUserContext();
  const { tokens } = useTheme();
  useTitle('Home');

  return (
    <main>
      <NavBar />
      <Text variation='primary'>Hello {user?.username}</Text>
      <Button variation='primary' onClick={signOut}>
        Sign out
      </Button>
    </main>
  );
};

export default Home;
