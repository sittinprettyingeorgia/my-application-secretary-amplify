import { Auth } from 'aws-amplify';

export const isAuthenticated = async () => {
  try {
    const session = await Auth.currentSession();
    return session.isValid();
  } catch (error) {
    return false;
  }
};
