import { handleAPIError } from '@/util/api';
import { Auth } from 'aws-amplify';

export const login = async (res: any, req: any) => {
  try {
    if (req.method === 'POST') {
      const { username, password } = req.body ?? {};

      const { user } = await Auth.signIn(username, password);

      res.json({ success: true });
    }
  } catch (e) {
    handleAPIError(res, 'User login failed');
  }
};

export const signUp = async (res: any, req: any) => {
  try {
    if (req.method === 'POST') {
      const { username, password } = req.body ?? {};

      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {},
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true
        }
      });
    }

    res.json({ success: true });
  } catch (e) {
    handleAPIError(res, 'Failed to singup user');
  }
};
