import { authUser } from '@/appConstants';
import RequireAuth from '@/shared/RequireAuth';
import Wrapper from '@/shared/Wrapper';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Home = () => {
  const { user, signOut } = useAuthenticator(context => [context.user]);

  return (
    <RequireAuth>
      <Wrapper pages={authUser}></Wrapper>
    </RequireAuth>
  );
};

export default Home;
