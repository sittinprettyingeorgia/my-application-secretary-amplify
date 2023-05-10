import { authUser } from '@/appConstants';
import { useUserContext } from '@/context/UserContext';
import RequireAuth from '@/shared/RequireAuth';
import Wrapper from '@/shared/Wrapper';

const Home = () => {
  const { user } = useUserContext();

  return (
    <RequireAuth>
      <Wrapper pages={authUser}></Wrapper>
    </RequireAuth>
  );
};

export default Home;
