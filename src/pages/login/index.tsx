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

const Login = ({ isPassedToWithAuthenticator, signOut, user }: any) => {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  const router = useRouter();
  const { setUser } = useUserContext();
  const { route } = useAuthenticator(context => [context.route]);
  const from = (router.query.from || '/') as string;

  useEffect(() => {
    if (route === 'authenticated') {
      setUser(user); //TODO: call app and get app user info. currently returns auth user we need
      //app user here
      router.replace(from);
    }
  }, [route, router, from]);

  return <Box className='auth-wrapper'></Box>;
};

export default withAuthenticator(Login, {
  components: {
    //Header: Header, this should be custom logo
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  },
  socialProviders: ['amazon', 'apple', 'facebook', 'google'] //TODO: add facebook, apple, amazon, etc logins
});

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true
    }
  };
}
