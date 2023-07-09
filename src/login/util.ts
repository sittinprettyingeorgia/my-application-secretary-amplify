import { handleAPIError } from '@/util/api';
import { Auth } from 'aws-amplify';

export const login = async (res: any, req: any) => {
  let success = false;
  try {
    if (req.method === 'POST') {
      const { username, password } = req.body ?? {};
      await Auth.signIn(username, password);

      success = true;
    }
  } catch (e) {
    handleAPIError(res, e, 'User login failed');
  }

  res.status(200).json({ success });
};

export const signUp = async (res: any, req: any) => {
  let success = false;

  try {
    if (req.method === 'POST') {
      const { username, password } = req.body ?? {};

      await Auth.signUp({
        username,
        password,
        attributes: {},
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true
        }
      });
      success = true;
    }
  } catch (e) {
    handleAPIError(res, e, 'Failed to signup user');
  }

  res.status(200).json({ success });
};
