import { createContext, useContext } from 'react';

type Profile = {
  user: any;
  signOut: any;
  socket: any;
};

const profile: Profile = {
  user: undefined,
  signOut: undefined,
  socket: undefined
};

//TODO: add user theme and context here.
export const UserContext = createContext(profile);

export const useUserContext = () => {
  const { user, signOut, socket } = useContext(UserContext);
  return { user, signOut, socket };
};
