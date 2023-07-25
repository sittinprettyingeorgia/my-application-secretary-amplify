import { useQuery } from '@tanstack/react-query';
import getData from './useData';
import { useUserAuthContext } from '@/context/UserAuthContext';

const useCurrentUser = (): any => {
  const { authUser } = useUserAuthContext();
  const {
    data: user,
    isLoading,
    isError
  } = useQuery(
    [`user-${authUser.username}`],
    () => getData({ path: `user?user=${authUser.username}`, method: 'GET' }),
    { staleTime: 1000 * 60 * 1 }
  );

  return { user, isLoading, isError };
};

export default useCurrentUser;
