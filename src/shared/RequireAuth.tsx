import { useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';

export default function RequireAuth({ children }: any) {
  const router = useRouter();
  const { user } = useUserContext();
  const from = router.asPath;

  useEffect(() => {
    if (!user?.username && from !== '/login') {
      router.replace('/login?from=' + from);
    }
  }, [router, from, user]);

  return user?.username ? children : null;
}
