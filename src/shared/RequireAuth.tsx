import { useEffect } from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useRouter } from 'next/router';

export default function RequireAuth({ children }: any) {
  const router = useRouter();
  const { route } = useAuthenticator(context => [context.route]);
  const from = router.asPath;

  useEffect(() => {
    if (route !== 'authenticated') {
      router.replace('/login?from=' + from);
    }
  }, [route, router, from]);

  return route === 'authenticated' ? children : null;
}
