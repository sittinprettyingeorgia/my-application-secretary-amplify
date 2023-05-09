import { useEffect } from 'react';

import {
  Authenticator,
  useAuthenticator,
  withAuthenticator
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { SignInHeader, SignInFooter, Footer } from '@/login';
import { useUserContext } from '@/context/UserContext';

const Login = () => {
  const router = useRouter();
  const { user } = useAuthenticator();
  const { setUser } = useUserContext();
  const from = (router.query.from || '/') as string;

  useEffect(() => {
    if (user?.username) {
      setUser(user);
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
