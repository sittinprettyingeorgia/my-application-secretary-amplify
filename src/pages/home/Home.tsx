import { Text, useTheme } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import { useUserContext } from 'context/UserContext';
import useTitle from 'hooks/useTitle';
import Navbar from 'shared/Navbar';

const Home = ({ children }: any): JSX.Element => {
  const { user, signOut } = useUserContext();
  const { tokens } = useTheme();
  useTitle('Home');

  return (
    <main>
      <Navbar />
      <Text variation='primary'>Hello {user?.username}</Text>
      <Button color='secondary' onClick={signOut}>
        Sign out
      </Button>
    </main>
  );
};

export default Home;
