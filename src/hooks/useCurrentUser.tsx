import { useQuery } from '@tanstack/react-query';
import { getData } from '@/util/api';
import { useUserAuthContext } from '@/context/UserAuthContext';
import { useState, useEffect } from 'react';

const TWELVE_HOURS = 1000 * 60 * 60 * 12;
type Options = {
  staleTime?: number;
};

const useCurrentUser = (options?: Options): any => {
  const { authUser } = useUserAuthContext();
  const [shouldFetch, setShouldFetch] = useState(!!authUser);
  const {
    data: user,
    isLoading,
    isError
  } = useQuery(
    [`user-${authUser?.username}`],
    (/*{ signal }*/) =>
      getData({
        path: `user?user=${authUser?.username}`,
        method: 'GET'
      }),
    { staleTime: options?.staleTime || TWELVE_HOURS, enabled: shouldFetch }
  );

  useEffect(() => {
    setShouldFetch(!!authUser);
  }, [authUser]);

  return { authUser, user, isLoading, isError };
};

export default useCurrentUser;
