import { useQuery } from '@tanstack/react-query';
import { getData } from '@/util/api';
import { useUserAuthContext } from '@/context/UserAuthContext';

const TWELVE_HOURS = 1000 * 60 * 60 * 12;
type Options = {
  staleTime?: number;
};

const useCurrentUser = (options?: Options): any => {
  const { authUser } = useUserAuthContext();
  const {
    data: user,
    isLoading,
    isError
  } = useQuery(
    [`user-${authUser.username}`],
    ({ signal }) =>
      getData({
        path: `user?user=${authUser.username}`,
        method: 'GET',
        signal
      }),
    { staleTime: options?.staleTime || TWELVE_HOURS }
    // TODO: whenever a user is updated we need to store the result in this cache.
    // all http requests should return the updated object.
  );

  return { user, isLoading, isError };
};

export default useCurrentUser;
