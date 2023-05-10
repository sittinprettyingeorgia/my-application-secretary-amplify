import { useEffect } from 'react';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { SignInHeader, SignInFooter, Footer } from '@/login';
import { useUserContext } from '@/context/UserContext';
import { Cache } from 'aws-amplify';

const Login = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const { route, user } = useAuthenticator(context => [context.route]);
  const from = (router.query.from || '/') as string;

  useEffect(() => {
    Cache.setItem('from', from);
    console.log(from);

    if (route === 'authenticated') {
      console.log('user authenticated');
      router.replace(from);
    } else {
      console.log('user not found');
    }
  }, [route, from]);

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
