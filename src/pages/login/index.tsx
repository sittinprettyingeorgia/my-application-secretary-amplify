import { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { SignInHeader, SignInFooter, Footer } from '@/login';
import { Cache } from 'aws-amplify';

const Login = () => {
  const router = useRouter();
  const from = (router.query.from || '/') as string;

  useEffect(() => {
    Cache.setItem('from', from);
  }, [from]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh' // set the height of the container to be full height
      }}
    >
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
