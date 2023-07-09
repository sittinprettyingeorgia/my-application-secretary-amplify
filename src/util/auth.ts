import { Auth } from 'aws-amplify';

export const isAuthenticated = async () => {
  try {
    return await Auth.currentUserPoolUser();
  } catch (error) {
    return false;
  }
};
