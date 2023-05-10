import { authUser } from '@/appConstants';
import { useUserContext } from '@/context/UserContext';
import RequireAuth from '@/shared/RequireAuth';
import Wrapper from '@/shared/Wrapper';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

const Home = () => {
  const { user } = useUserContext();
  return <Wrapper pages={authUser}></Wrapper>;
};

export default Home;
