import { useQuery } from '@tanstack/react-query';
import getData from './useData';
import { useUserAuthContext } from '@/context/UserAuthContext';

const TWELVE_HOURS = 1000 * 60 * 60 * 12;
const useCurrentUser = (): any => {
  const { authUser } = useUserAuthContext();
  const {
    data: user,
    isLoading,
    isError
  } = useQuery(
    [`user-${authUser.username}`],
    () => getData({ path: `user?user=${authUser.username}`, method: 'GET' }),
    { staleTime: TWELVE_HOURS }
    // TODO: Document this is refetched every 12 hours
  );

  return { user, isLoading, isError };
};

export default useCurrentUser;
