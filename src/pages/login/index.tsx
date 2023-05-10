import { useEffect } from 'react';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { SignInHeader, SignInFooter, Footer } from '@/login';
import { useUserContext } from '@/context/UserContext';

const Login = () => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const from = (router.query.from || '/') as string;

  useEffect(() => {
    if (user?.username) {
      router.replace(from);
    }
  }, [user, router, from, setUser]);

  return (
    <Box className='auth-wrapper'>
      <Authenticator
        components={{
          //Header: Header, this should be custom logo
          SignIn: {
            Header: SignInHeader,
            Footer: SignInFooter
          },
          Footer
        }}
        socialProviders={['amazon', 'apple', 'facebook', 'google']}
      />
    </Box>
  );
};

export default Login;
