import { useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';
import { useUserAuthContext } from '@/context/UserAuthContext';

export default function RequireAuth({ children }: any) {
  const router = useRouter();
  const { authUser } = useUserAuthContext();
  const from = router.asPath;

  useEffect(() => {
    if (!authUser?.authUser?.username && from !== '/login') {
      router.replace('/login?from=' + from);
    }
  }, [router, from, authUser?.authUser?.username]);

  return authUser?.authUser?.username ? children : null;
}
