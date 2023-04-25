import { createContext, useContext } from 'react';

type Profile = {
  signOut: () => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
};

const initialProfile: Profile = {
  signOut: () => {
    /*empty*/
  },
  socket: null,
  setSocket: socket => {
    /*empty*/
  }
};

export const UserContext = createContext<Profile>(initialProfile);

export const useUserContext = () => {
  const { setSocket, socket, signOut } = useContext(UserContext);
  return { setSocket, socket, signOut };
};
