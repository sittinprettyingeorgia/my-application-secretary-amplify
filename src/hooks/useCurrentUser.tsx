import { useQuery } from '@tanstack/react-query';
import { getData } from '@/util/api';
import { useUserAuthContext } from '@/context/UserAuthContext';
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const TWELVE_HOURS = 1000 * 60 * 60 * 12;
type Options = {
  staleTime?: number;
};
type AuthToken = {
  Authorization: string;
  access_token: string;
};

const useCurrentUser = (options?: Options): any => {
  const { authUser } = useUserAuthContext();

  const [shouldFetch, setShouldFetch] = useState(!!authUser);
  const { data, isLoading, isError } = useQuery(
    [`user-${authUser?.username}`],
    ({ signal }) =>
      getData(
        {
          path: `user?user=${authUser?.username}`,
          method: 'GET',
          signal
        },
        {
          Authorization: authUser?.Authorization,
          access_token: authUser?.access_token
        }
      ),
    { staleTime: options?.staleTime || TWELVE_HOURS, enabled: shouldFetch }
  );

  useEffect(() => {
    setShouldFetch(!!authUser);
  }, [authUser]);

  return { authUser, user: data, isLoading, isError };
};

export default useCurrentUser;
