import { createContext, useContext } from 'react';

type Profile = {
  signOut: () => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
  user: any;
};

const initialProfile: Profile = {
  signOut: () => {
    /*empty*/
  },
  socket: null,
  setSocket: socket => {
    /*empty*/
  },
  user: null
};

export const UserContext = createContext<Profile>(initialProfile);

export const useUserContext = () => {
  const { setSocket, socket, signOut, user } = useContext(UserContext);
  return { setSocket, socket, signOut, user };
};
