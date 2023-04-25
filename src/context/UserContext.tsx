import { createContext, useContext } from 'react';

type Profile = {
  user: any;
  setUser: (user: any) => void;
  signOut: () => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
};

const initialProfile: Profile = {
  user: null,
  setUser: user => {
    /*empty*/
  },
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
  const { user, setUser, signOut, setSocket, socket } = useContext(UserContext);
  return { user, setUser, signOut, setSocket, socket };
};
