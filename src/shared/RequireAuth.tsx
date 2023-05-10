import { useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';

import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function RequireAuth({ children }: any) {
  const router = useRouter();
  const { user } = useUserContext();
  const { user: other } = useAuthenticator();
  const from = router.asPath;

  useEffect(() => {
    if (!user?.username) {
      router.replace('/login?from=' + from);
    }

    console.log(user);
    console.log(other);
  }, [router, from, user]);

  return user?.username ? children : null;
}
