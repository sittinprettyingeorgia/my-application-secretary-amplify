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
  const { data, isLoading, isError } = useQuery(
    [`user-${authUser?.username}`],
    (/*{ signal }*/) =>
      getData(
        {
          Authorization: authUser?.Authorization,
          access_token: authUser?.access_token
        },
        {
          path: `user?user=${authUser?.username}`,
          method: 'GET'
        }
      ),
    { staleTime: options?.staleTime || TWELVE_HOURS, enabled: !!authUser }
  );

  return { authUser, user: data, isLoading, isError };
};

export default useCurrentUser;
